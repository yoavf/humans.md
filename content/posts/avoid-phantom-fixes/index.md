+++
date = '2025-10-03T16:10:17+03:00'
draft = false
title = 'Avoid phantom fixes'
category = 'Building'
+++

Agents sometimes introduce bugs during development, fix them, then reference the fix in commit messages - even though the bug never existed in the previous commit. These phantom fixes claim credit for solving problems that only existed mid-session. 

{{< conversation >}}
assistant: All done! Let me commit these changes.
tool: Bash(git commit -m "Add Kung fu lessons & fix glitch in the matrix")
interrupted Neo
user: There is no glitch. You added it in this session then fixed it.
assistant: You're absolutely right! Let me reload that.
tool: Bash(git commit -m "feat: Add Kung fu lessons.")
{{< /conversation >}}

You can try to prevent this with a reminder in your AGENTS.md:

{{< editor file="AGENTS.md" >}}
## Commit Messages

Only reference bugs that existed in the last commit. Don't mention bugs you introduced and fixed in this session.
{{< /editor >}}

Still, always review commit messages before accepting them.

{{< see-also "agents-md-symlink" "turn-later-into-issues" >}}
