+++
date = '2025-10-05T18:55:39+03:00'
draft = false
title = 'Reference Other Sessions'
category = 'Building'
+++

When working on a complex task across multiple sessions, it may be useful to point the agent to previous conversations for additional context. Many AI coding tools store session history locally in the file system.

{{< conversation height-adjust="-60" >}}
assistant: We have a bug in the flux capacitor. Let me see w
interrupted
user: We've already sorted this. See our session in ~/.claude/projects/delorean/MTk1NTExMDU=.json
assistant: Let me read that session to understand what we discussed.
tool: Read(~/.claude/projects/delorean/MTk1NTExMDU=.json)
output: Read 55 lines
processing: Fueling...
assistant: You're absolutely right! We already have the solution. I'll fix it by setting the constant to 19851026.
processing: Time travelling…
{{< /conversation >}}

In Claude Code, sessions live in `~/.claude/projects` by default. For cross-agent workflows, tools like [ai-sessions-mcp][1] lets you see sessions from multiple tools (Codex, Claude Code, Gemini CLI...) making it possible to start a session in one agent and continue it in another, keeping your work portable across different AI coding environments.

This beats re-typing context and ensures continuity across your workflow.

{{< see-also "clear-often" >}}

 [1]: https://github.com/yoavf/ai-sessions-mcp
