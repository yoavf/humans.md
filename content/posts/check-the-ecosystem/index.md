+++
date = '2025-10-02T19:21:14+03:00'
draft = false
title = 'Check the ecosystem'
category = 'Setup'
+++

Before the agent starts implementing a large feature from scratch, ask what popular libraries exist for that task. This achieves two things: you get a quick review of existing solutions, and you prime the model to actually use one instead of reinventing the wheel.

{{< conversation >}}
assistant: Should I proceed to implement the form validation?
user: What are the most popular libraries for form validation in React?
processing: Comparing...
assistant: The most widely used options for form validation in React are:

  1. React Hook Form (41k+ stars) - Performance-focused with minimal re-renders
  2. Formik (33k+ stars) - Battle-tested, full-featured, great documentation
  3. Zod (33k+ stars) - TypeScript-first schema validation library
  4. Yup (22k+ stars) - Schema validation, works well with both Formik and React Hook Form

The most popular modern combo is React Hook Form + Zod for performance and type safety.

user: Let's go with React Hook Form and Zod.
assistant: Great choice! Installing both packages.
tool: Bash(npm install react-hook-form zod @hookform/resolvers)
output: added 5 packages in 3s
{{< /conversation >}}

This simple question prevents wasted effort on custom implementations and keeps you in the ecosystem of maintained, documented solutions.

{{< see-also "mvp-mode" "start-with-a-script" >}}
