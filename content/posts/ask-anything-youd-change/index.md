+++
date = '2025-09-27T19:08:00+03:00'
draft = false
title = 'Ask: can you simplify anything?'
+++

After implementing a feature, ask your agent: "Examine the changes since the last commit – can you simplify anything?" Self-reflection works for AI agents too.

{{< conversation >}}
assistant: Perfect! The feature has been implemented and works as planned!
user: Examine the changes since the last commit – can you simplify anything?
tool: Read (over-engineered/code.rs)
tool: Update (over-engineered/code.rs)
output: Deleted 42 lines from over-engineered/code.rs
{{< /conversation >}}

Hat tip: [Boris Gorelik][1]

 [1]: https://www.linkedin.com/posts/boris-gorelik-phd_vibecoding-devtips-git-activity-7357744987200978944-FLaX
 