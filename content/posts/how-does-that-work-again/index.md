+++
date = '2025-10-06T09:39:38+03:00'
draft = false
title = 'How does that work again?'
category = 'Building'
+++

When you come back to a codebase cold, make the agent rebuild the mental map for you. Ask it to scan recent commits, open todos, or its own transcripts and report the highlights.

{{< conversation height-adjust="-20" >}}
user: Remind me: do we validate access tokens in middleware, a decorator, or somewhere else?
assistant: I'll trace where the validation ended up.
tool: Bash(git log --oneline -5 -- backend/src/auth)
output: a2bf4c1 move validation to middleware\n6f91a22 add session decorator fallback\n31ab59d tighten refresh rotation
tool: Bash(rg -n "validateAccessToken" backend/src)
output: backend/src/auth/middleware/require-auth.ts:18:export async function validateAccessToken
backend/src/auth/decorators/with-session.ts:42:    await validateAccessToken
tool: Read(~/.claude/projects/northwind-payments/latest-session.jsonl)
output: last plan → confirm middleware path, update docs, rerun auth integration tests.
assistant: Validation now lives in `backend/src/auth/middleware/require-auth.ts`; the decorator just forwards to it. Docs and test reruns are still on the todo list.
{{< /conversation >}}

Modern agents can chew through logs, issues, and transcripts in a minute or two and hand you back an exact answer—it beats paging through files hoping the context comes back on its own.

Hat tip: [Simon Willison](https://simonwillison.net/2025/Oct/5/parallel-coding-agents/#how-does-that-work-again)

{{< see-also "reference-past-sessions" >}}
