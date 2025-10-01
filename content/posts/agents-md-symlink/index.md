+++
date = '2025-09-30T21:14:24+03:00'
draft = false
title = 'Symlink AGENTS.md'
category = 'Setup'
+++

Different AI coding agents use different configuration files:
- `.github/copilot-instructions.md` for GitHub Copilot
- `CLAUDE.md` for Claude Code
- `GEMINI.md` for Gemini
- `AGENTS.md` for various other tools

You might switch tools later. The industry is converging on [AGENTS.md](https://agents.md/), so use that as your source of truth and symlink the others to it.

```bash
ln -s AGENTS.md CLAUDE.md
ln -s AGENTS.md .github/copilot-instructions.md
```
