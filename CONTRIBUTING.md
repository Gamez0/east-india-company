# Contributing Guide

## Branch Naming

| Prefix | When to use |
|--------|-------------|
| `feat/` | New feature |
| `fix/` | Bug fix |
| `refactor/` | Code refactor |
| `chore/` | Tooling, config, dependencies |
| `docs/` | Documentation only |

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): subject
```

- **type**: `feat` | `fix` | `refactor` | `chore` | `docs` | `style` | `test`
- **scope**: app or package name (`bithumb`, `bunjang`, `ui`, `ci`, etc.), or `repo` for root-level changes
- **subject**: short, imperative, English

**Examples:**
```
feat(bithumb): add order book chart
fix(ci): resolve pnpm version conflict
chore(ui): upgrade radix-ui to v2
chore(repo): update turbo config
```

## Pull Requests

- Title follows the same Conventional Commits format
- One purpose per PR — do not mix feat/fix/refactor
- Write in **English**
- Merged via **squash merge** — branch commits don't need to be clean, PR title becomes the final commit message

## Language

| Context | Language |
|---------|----------|
| Commit messages | English |
| PR title & body | English |
| Code review comments | Korean or English |
| Issues | Korean or English |
