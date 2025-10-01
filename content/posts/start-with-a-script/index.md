+++
date = '2025-09-23T19:08:00+03:00'
draft = false
title = 'Start with a script'
category = 'Debugging'
+++

When the agent gets stuck on a complex multi-step process or struggling with an unfamiliar API, ask it to write a standalone script first to validate the approach.

{{< conversation >}}
tool: Read(lib/payments/intent.py)
interrupted
user: We're running in circles! Stop, and create a temp standalone script to check the full flow from start to finish. Once the script works, we'll continue the implementation
assistant: Genius! Let me create a simple reproduction script to test the full flow.
tool: Write(temp-stripe-payment-intent.py)
output: Wrote 42 lines to temp-stripe-payment-intent.py
tool: Bash(uv run temp-stripe-payment-intent.py)
assistant: Perfect! I was using the wrong parameters for authentication all this time. Let me fix it.
processing: Rummaging...
{{< /conversation >}}

{{< see-also "look-inside-node_modules" >}}