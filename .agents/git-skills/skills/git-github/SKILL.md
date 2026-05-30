---
name: git-github
description: "Guidelines and best practices for Git version control, branching models, commit message formatting, and GitHub pull request workflows. Use when managing git repositories, branches, commits, or pull requests. Vietnamese: Git, commit, nhánh, merge, pull request, GitHub."
---

# Git & GitHub Best Practices

This skill provides Git and GitHub workflow guidance.


## Hướng dẫn (Tiếng Việt)

Skill này cung cấp **quy tắc Git và GitHub** — bao gồm chiến lược nhánh, quy ước commit, và quy trình pull request.

### Khi nào dùng skill này
- Khi cần biết **đặt tên nhánh** như thế nào
- Khi viết **commit message** đúng chuẩn
- Khi tạo **pull request** trên GitHub
- Khi cần **chiến lược branching** cho team

### Ví dụ câu prompt tiếng Việt
- "Tạo nhánh cho tính năng mới" → feat/ten-tinh-nang
- "Viết commit message" → type(scope): mô tả
- "Tạo pull request" → Quy trình PR chuẩn

## When to Activate

Activate this skill when the user:
- Asks about Git branching strategies
- Needs to write commit messages
- Wants to set up PR workflows
- Asks about Git best practices (rebase vs merge, etc.)

**Trigger keywords:** git, commit, branch, merge, rebase, pull request, PR, GitHub, git flow, trunk-based

## How to Use

Read and follow the instructions based on the task:

```
What Git/GitHub task?
├── Writing commit messages
│   → Follow Conventional Commits format:
│   → type(scope): description
│   → Types: feat, fix, docs, style, refactor, test, chore
│
├── Branching strategy
│   → Use feature branches off main
│   → Branch naming: type/description (e.g., feat/user-auth)
│
├── Pull requests
│   → Clear title and description
│   → Link to related issues
│   → Request appropriate reviewers
│
└── Git workflow best practices
    → Small, focused commits
    → Rebase before merge to keep history clean
    → Never force push to shared branches
```

For more detailed Git patterns from other sources:
- `agent-skills-lifecycle` → `git-workflow-and-versioning` (Google SWE practices)
- `superpowers-workflow` → `using-git-worktrees` (isolated workspaces)
- `ecc-devops` → `git-workflow` (ECC patterns)
