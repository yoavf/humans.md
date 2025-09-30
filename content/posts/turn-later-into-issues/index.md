+++
date = '2025-09-30T22:51:44+03:00'
draft = false
title = "Turn 'later' into issues"
+++

When you defer work, you risk forgetting about it. Configure your agent to create GitHub issues automatically. Add this to your AGENTS.md:

{{< editor file="AGENTS.md" >}}
## Deferred work

When I say we'll handle something later, suggest creating a GitHub issue.
Choose the relevant template from .github/ISSUE_TEMPLATE and use `gh` to create an issue.
{{< /editor >}}

Here's how it works in practice:

{{< conversation  height-adjust="20" >}}
assistant: Added the validation logic. Do you want me to add the caching layer?
user: No, let's do that later.
assistant: Should I create an issue to track the caching optimization?
user: yes
tool: Bash (gh issue create --title "Add caching to validation logic" [...])
output: https://github.com/user/repo/issues/42
{{< /conversation >}}

This keeps you focused on the current task without losing track of what needs to be done.

{{< see-also "mvp-mode" "agents-md-symlink" >}}
