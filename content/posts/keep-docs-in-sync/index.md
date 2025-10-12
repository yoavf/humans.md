+++
date = '2025-10-12T08:38:38+03:00'
draft = false
title = 'Keep docs in sync'
category = 'Refining'
+++

Periodically ask your agent to review recent changes and sync the related docs:

{{< conversation >}}
user: Review the last endpoint changes and make sure the API docs are up to date.
tool: Bash(git log --oneline -10 -- backend/src/routes)
output: 7a3f2e1 add rate limiting to /auth/refresh\nc9d4b82 deprecate /users/legacy endpoint\n51ab3f9 update /payments response schema
tool: Read(docs/api/authentication.md)
tool: Read(docs/api/users.md)
tool: Edit(docs/api/authentication.md)
output: Added rate limiting details to /auth/refresh endpoint
tool: Edit(docs/api/users.md)
output: Marked /users/legacy as deprecated with migration path
assistant: Updated docs to reflect the rate limiting on refresh and the deprecated legacy endpoint. The payments schema change is already documented.
{{< /conversation >}}

And/or in your instructions file to make sure the agent does it for its own changes:

{{< editor file="AGENTS.md" >}}
### Docs Updates

Every time you make a change to `/api/endpoints`, update our external facing API docs in `/docs/api`.
{{< /editor >}} 

{{< see-also "how-does-that-work-again" >}}
