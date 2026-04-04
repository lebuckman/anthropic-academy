# Claude Code in Action

**Completed:** April 2026 &nbsp;|&nbsp;
[**View Certificate**](http://verify.skilljar.com/c/n3yj3e3vtd3t)

---

## 📍 What This Course Covers

- Coding assistant architecture
- Claude Code's tool use system
- Context management strategies (`CLAUDE.md`, `@` mentions, plan vs thinking mode)
- Conversation control — interrupting, rewinding, compacting, and clearing context
- Custom commands (now "skills") and automation
- Connecting to external services with MCP servers (e.g. Playwright)
- GitHub Actions integration
- Intercepting and responding to tool calls with hooks
- The Claude Code SDK for running Claude programmatically in scripts and pipelines

## 📚 Takeaways

The core insight of this course is understanding Claude Code not as a chatbot but as an agent with tools. Rather than typing prompts hoping for good output, you are configuring an environment and directing an agent.

- **Context is a resource.** Too much irrelevant context degrades Claude's performance. Knowing when to `@`-mention a file, when to rewind, when to `/compact` vs `/clear` are all workflow decisions with trade-offs.
- **Hooks make AI assistance auditable and safe.** Being able to intercept tool calls before they execute (e.g. blocking sensitive reads, preventing duplicate database queries) means you can bring Claude into sensitive codebases without losing control.
- **Skills and the SDK turn Claude into infrastructure.** Once you move from ad-hoc prompts to reusable skills and programmatic SDK calls, Claude Code starts functioning as a layer in the development pipeline.

## ⚡ Exercises

| Project                  | Topics Applied                                                                |
| ------------------------ | ----------------------------------------------------------------------------- |
| [`uigen/`](./uigen/)     | Core tools, context management, skills, MCP (Playwright), GitHub integration  |
| [`queries/`](./queries/) | Hooks — `PreToolUse` / `PostToolUse`, SDK usage, query duplication prevention |
