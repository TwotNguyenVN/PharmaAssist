---
name: git-worktrees
description: "Use when starting feature work that needs isolation from current workspace. Ensures an isolated workspace exists via git worktree, with proper setup and clean test baseline. Vietnamese: workspace cô lập, nhánh riêng, worktree."
---

# Git Worktrees for Isolated Development

This skill is sourced from the **Superpowers** repository.

**Source directory:** `../../../../../superpowers/skills/using-git-worktrees/`

## Hướng dẫn (Tiếng Việt)

Skill này giúp tạo **workspace cô lập** bằng Git worktree — để phát triển tính năng mà không ảnh hưởng đến code hiện tại.

### Khi nào dùng skill này
- Khi cần **tách nhánh riêng** cho tính năng mới
- Khi muốn **phát triển song song** mà không conflict
- Khi cần **thử nghiệm** mà không ảnh hưởng code chính

### Ví dụ câu prompt tiếng Việt
- "Tạo workspace riêng cho tính năng X" → Git worktree
- "Cô lập code để thử nghiệm" → Git worktree

## When to Activate

Activate this skill when the user:
- Starts a new feature that needs isolation
- Wants to work on a branch without affecting main workspace
- Needs parallel workspaces for multiple features
- Mentions worktree, isolation, or clean workspace

**Trigger keywords:** worktree, isolated workspace, feature branch, clean workspace, parallel development

## How to Use

1. Read and follow: `../../../../../superpowers/skills/using-git-worktrees/SKILL.md`
2. Creates isolated git worktree with clean test baseline
3. Use in combination with `writing-plans` and `tdd` for full workflow

For the full Superpowers workflow, see `superpowers-workflow`.
