+++
date = '2025-09-29T19:08:00+03:00'
draft = false
title = 'Clear Often'
+++

When working with AI coding agents, clear the conversation often. A fresh context keeps the agent focused on your current task without baggage from earlier attempts.

{{< conversation height-adjust="20">}}
assistant: We're running into an error again. Let me try again to update the
interrupted
user: /clear
output: (no content)
user: We have this bug: triggering an update returns an error. We've already explored x and y, and it didn't work.
assistant: I'll help you investigate the bug where triggering an update returns an error. Let me start by reading the relevant code.
processing: Whatchamacalling
{{< /conversation >}}

Without clearing, the agent may fixate on previous failed approaches or misremember what you've already tried. Start fresh, summarize what matters, and move forward.
