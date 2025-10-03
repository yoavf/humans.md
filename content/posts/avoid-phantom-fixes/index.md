+++
date = '2025-10-03T16:10:17+03:00'
draft = false
title = 'Avoid phantom fixes'
category = 'Building'
+++

Agents sometimes introduce bugs during development, fix them, then reference the fix in commit messages - even though the bug never existed in the previous commit. These phantom fixes claim credit for solving problems that only existed mid-session. 

{{< conversation >}}
assistant: All done! Let me commit these changes.
tool: Bash(git commit -m "Add email validation & fix validation error in UserForm")
interrupted
user: That validation error didn't exist before. You added it in this session then fixed it.
assistant: You're absolutely right! Let me rewrite that.
tool: Bash(git commit -m "Add email validation to UserForm")
{{< /conversation >}}

You can try to prevent this with a reminder in your AGENTS.md:

{{< editor file="AGENTS.md" >}}
## Commits

Only reference bugs that existed in the last commit. Don't mention bugs you introduced and fixed in this session.
{{< /editor >}}

Still, always review commit messages before accepting them.

{{< see-also "agents-md-symlink" "turn-later-into-issues" >}}
