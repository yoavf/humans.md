+++
date = '2025-10-01T00:13:00+03:00'
draft = false
title = 'Just fix it'
+++

When the agent fails multiple times on something trivial, stop and fix it yourself. You know how to code—make the change directly, then let the agent continue from there.

{{< conversation >}}
assistant: Let me update the import path.
tool: Edit(src/utils/formatter.js) fail=true
error: File does not exist
assistant: Let me try the correct path.
tool: Edit(../src/util/formatter.js) fail=true
error: File does not exist
interrupted
user: Argh, fixed it for you. The file is in lib/formatter. Can you add the error handling now?
assistant: You're absolutely right! Now I'll add the error handling.
tool: Edit(lib/formatter.js)
{{< /conversation >}}

This beats spending hours and wasting tokens on an unproductive back-and-forth. Fix it, then move forward.

Hat tip: [Anton Zhiyanov][1]

{{< see-also "look-inside-node_modules" "start-with-a-script" >}}

 [1]: https://antonz.org/write-code/

