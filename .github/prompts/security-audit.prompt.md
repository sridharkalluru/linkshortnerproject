---
name: security-audit
description: Describe when to use this prompt
agent: ask
---

perform a security audit on the codebase to identify potential vulnerabilities.

output the findings in a markdown report formattated table with the following coloumns: "ID","severity","description","filepath","line number","recommendation".

Next, ask the user which issues they want to fix by either providing the ID(s) of the issues or the severity level (e.g., "all critical issues" or "ID 1, 3, 5"). After their reply, run a separate sub agent(#runSubAgent) to fix each issue that the user has specified. Each sub agent should report back with a simple `subAgentSuccess: true | false`.
