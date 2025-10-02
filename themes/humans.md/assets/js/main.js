// Terminal typing effect - Claude Code style (bottom-up)
document.addEventListener('DOMContentLoaded', () => {
  const terminals = document.querySelectorAll('.terminal');

  terminals.forEach(terminal => {
    const messagesContainer = terminal.querySelector('.term-messages');
    const inputLine = terminal.querySelector('.term-input .term-content');
    const dataScript = terminal.querySelector('.term-data');
    const restartButton = terminal.querySelector('.term-restart');

    if (!dataScript) return;

    const messages = JSON.parse(dataScript.textContent);

    // Get height adjustment from data attribute
    const heightAdjust = parseInt(terminal.dataset.heightAdjust || '0', 10);

    // Calculate height once (doesn't change)
    const tempContainer = document.createElement('div');
    tempContainer.style.visibility = 'hidden';
    tempContainer.style.position = 'absolute';
    tempContainer.style.width = terminal.clientWidth - 48 + 'px';
    tempContainer.className = 'term-messages';
    terminal.appendChild(tempContainer);

    messages.forEach((msg, idx) => {
      const div = document.createElement('div');
      div.className = 'term-line';
      if (msg.type === 'user') {
        div.innerHTML = `<span class="term-prefix">&gt;</span><span class="term-content">${msg.content}</span>`;
      } else if (msg.type === 'assistant') {
        div.innerHTML = `<span class="term-prefix">⏺</span><span class="term-content">${msg.content}</span>`;
      } else if (msg.type === 'tool') {
        const dotClass = msg.failed ? 'term-dot-red' : 'term-dot-green';
        div.innerHTML = `<span class="term-prefix ${dotClass}">●</span><span class="term-content">${msg.content}</span>`;
      } else if (msg.type === 'output') {
        div.className = 'term-line term-output';
        div.innerHTML = `<span class="term-prefix">⎿</span><span class="term-content">${msg.content}</span>`;
      } else if (msg.type === 'error') {
        div.className = 'term-line term-error';
        div.innerHTML = `<span class="term-prefix">⎿</span><span class="term-content">${msg.content}</span>`;
      } else if (msg.type === 'interrupted') {
        div.className = 'term-line term-interrupted';
        div.innerHTML = `<span class="term-prefix">⎿</span><span class="term-content"><span class="interrupted-label">Interrupted</span> · What should Agent do instead?</span>`;
      } else if (msg.type === 'processing') {
        div.className = 'term-line term-processing';
        div.innerHTML = `<span class="term-spinner">⠋</span><span class="term-content">${msg.content}</span><span class="term-esc">(esc to interrupt)</span>`;
      }
      tempContainer.appendChild(div);
    });

    const messagesHeight = tempContainer.offsetHeight;
    const inputHeight = terminal.querySelector('.term-input').offsetHeight;
    const calculatedHeight = messagesHeight + inputHeight + 86 + heightAdjust; // Extra padding
    terminal.style.minHeight = calculatedHeight + 'px';
    tempContainer.remove();

    let restartTimeout = null;
    let activeIntervals = [];
    let activeTimeouts = [];
    let animationId = 0; // Track which animation is current

    // Animation function
    const startAnimation = () => {
      // Increment animation ID to invalidate old timeouts
      animationId++;
      const currentAnimationId = animationId;

      // Clean up any active timers
      if (restartTimeout) clearTimeout(restartTimeout);
      activeIntervals.forEach(interval => clearInterval(interval));
      activeTimeouts.forEach(timeout => clearTimeout(timeout));
      activeIntervals = [];
      activeTimeouts = [];

      // Clear content
      messagesContainer.innerHTML = '';
      inputLine.innerHTML = '';

      const inputCursor = document.createElement('span');
      inputCursor.className = 'term-cursor';
      inputCursor.textContent = '█';
      inputLine.appendChild(inputCursor);
      inputLine.insertBefore(document.createTextNode(''), inputLine.firstChild);

      restartTimeout = setTimeout(() => {
        if (animationId === currentAnimationId) {
          restartButton.classList.add('visible');
        }
      }, 3000);

      let currentMessageIndex = 0;

      const processMessage = () => {
        if (currentMessageIndex >= messages.length) {
          inputCursor.style.display = 'inline-block';
          restartButton.classList.add('finished');
          return;
        }

        const message = messages[currentMessageIndex];
        currentMessageIndex++;

        if (message.type === 'user') {
          typeUserMessage(message.content);
        } else if (message.type === 'assistant') {
          addAssistantMessage(message.content);
        } else if (message.type === 'tool') {
          addToolMessage(message);
        } else if (message.type === 'output') {
          addOutputMessage(message.content);
        } else if (message.type === 'error') {
          addErrorMessage(message.content);
        } else if (message.type === 'interrupted') {
          addInterruptedMessage();
        } else if (message.type === 'processing') {
          addProcessingMessage(message.content);
        }
      };

      const typeUserMessage = (text) => {
        if (animationId !== currentAnimationId) return;

        const typingSpeed = 40;
        let charIndex = 0;
        inputCursor.style.display = 'inline-block';

        const typeChar = () => {
          if (animationId !== currentAnimationId) return;

          if (charIndex < text.length) {
            const textNode = inputLine.childNodes[0];
            if (textNode) {
              textNode.textContent = text.slice(0, charIndex + 1);
            }
            charIndex++;

            const currentChar = text[charIndex - 1];
            const nextChar = text[charIndex];
            let delay;

            if (currentChar === '.' || currentChar === '!' || currentChar === '?') {
              delay = 400;
            } else if (currentChar === ',' || currentChar === ':') {
              delay = 200;
            } else if (currentChar === ' ' && nextChar && nextChar !== ' ') {
              delay = Math.random() < 0.4 ? 80 + Math.random() * 60 : typingSpeed + Math.random() * 20 - 10;
            } else {
              delay = typingSpeed + Math.random() * 20 - 10;
            }

            activeTimeouts.push(setTimeout(typeChar, delay));
          } else {
            activeTimeouts.push(setTimeout(() => {
              if (animationId !== currentAnimationId) return;

              const messageDiv = document.createElement('div');
              messageDiv.className = 'term-line term-user';
              messageDiv.innerHTML = `<span class="term-prefix">&gt;</span><span class="term-content">${text}</span>`;
              messagesContainer.appendChild(messageDiv);

              const textNode = inputLine.childNodes[0];
              if (textNode) {
                textNode.textContent = '';
              }

              activeTimeouts.push(setTimeout(processMessage, 100));
            }, 200));
          }
        };

        activeTimeouts.push(setTimeout(typeChar, 200));
      };

      let currentProcessingMessage = null;
      let currentProcessingInterval = null;

      const removeProcessingMessage = () => {
        if (currentProcessingMessage && currentProcessingMessage.parentNode) {
          if (currentProcessingInterval) {
            clearInterval(currentProcessingInterval);
            currentProcessingInterval = null;
          }
          currentProcessingMessage.remove();
          currentProcessingMessage = null;
        }
      };

      const addMessage = (className, prefix, content, delay) => {
        if (animationId !== currentAnimationId) return;

        inputCursor.style.display = 'inline-block';

        activeTimeouts.push(setTimeout(() => {
          if (animationId !== currentAnimationId) return;

          removeProcessingMessage();

          const messageDiv = document.createElement('div');
          messageDiv.className = `term-line ${className}`;
          messageDiv.innerHTML = `<span class="term-prefix${prefix === '●' ? ' term-dot-green' : ''}">${prefix}</span><span class="term-content">${content}</span>`;
          messagesContainer.appendChild(messageDiv);
          activeTimeouts.push(setTimeout(processMessage, delay));
        }, delay));
      };

      const addAssistantMessage = (content) => {
        addMessage('term-assistant', '⏺', content, 300);
      };

      const addToolMessage = (message) => {
        if (animationId !== currentAnimationId) return;

        inputCursor.style.display = 'inline-block';

        activeTimeouts.push(setTimeout(() => {
          if (animationId !== currentAnimationId) return;

          removeProcessingMessage();

          const dotClass = message.failed ? 'term-dot-red' : 'term-dot-green';

          const messageDiv = document.createElement('div');
          messageDiv.className = 'term-line term-tool';
          messageDiv.innerHTML = `<span class="term-prefix ${dotClass}">●</span><span class="term-content">${message.content}</span>`;
          messagesContainer.appendChild(messageDiv);
          activeTimeouts.push(setTimeout(processMessage, 600));
        }, 600));
      };

      const addOutputMessage = (content) => {
        addMessage('term-output', '⎿', content, 400);
      };

      const addErrorMessage = (content) => {
        addMessage('term-error', '⎿', content, 100);
      };

      const addInterruptedMessage = () => {
        addMessage('term-interrupted', '⎿', '<span class="interrupted-label">Interrupted</span> · What should Agent do instead?', 400);
      };

      const addProcessingMessage = (content) => {
        if (animationId !== currentAnimationId) return;

        inputCursor.style.display = 'inline-block';

        activeTimeouts.push(setTimeout(() => {
          if (animationId !== currentAnimationId) return;

          const messageDiv = document.createElement('div');
          messageDiv.className = 'term-line term-processing';

          const spinner = document.createElement('span');
          spinner.className = 'term-spinner';
          spinner.textContent = '⠋';

          const contentSpan = document.createElement('span');
          contentSpan.className = 'term-content';
          contentSpan.textContent = content;

          const escSpan = document.createElement('span');
          escSpan.className = 'term-esc';
          escSpan.textContent = '(esc to interrupt)';

          messageDiv.appendChild(spinner);
          messageDiv.appendChild(contentSpan);
          messageDiv.appendChild(escSpan);
          messagesContainer.appendChild(messageDiv);

          const spinnerFrames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
          let frameIndex = 0;
          const spinnerInterval = setInterval(() => {
            if (animationId !== currentAnimationId) {
              clearInterval(spinnerInterval);
              return;
            }
            frameIndex = (frameIndex + 1) % spinnerFrames.length;
            spinner.textContent = spinnerFrames[frameIndex];
          }, 80);

          activeIntervals.push(spinnerInterval);

          // Check if this is the last message
          const isLastMessage = currentMessageIndex >= messages.length;

          if (!isLastMessage) {
            // Store reference to remove later
            currentProcessingMessage = messageDiv;
            currentProcessingInterval = spinnerInterval;

            // Continue to next message after delay
            activeTimeouts.push(setTimeout(processMessage, 2500));
          } else {
            // If it's the last message, just continue normally
            activeTimeouts.push(setTimeout(processMessage, 400));
          }
        }, 400));
      };

      setTimeout(processMessage, 200);
    };

    restartButton.addEventListener('click', (e) => {
      e.stopPropagation();
      restartButton.classList.remove('finished');
      startAnimation();
    });

    startAnimation();
  });
});

// Editor copy button
document.addEventListener('DOMContentLoaded', () => {
  const editors = document.querySelectorAll('.editor');

  editors.forEach(editor => {
    const copyButton = editor.querySelector('.editor-copy');
    const contentDiv = editor.querySelector('.editor-content');

    if (!copyButton || !contentDiv) return;

    copyButton.addEventListener('click', async () => {
      const content = contentDiv.dataset.content;

      try {
        await navigator.clipboard.writeText(content);
        copyButton.classList.add('copied');
        setTimeout(() => {
          copyButton.classList.remove('copied');
        }, 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    });
  });
});
