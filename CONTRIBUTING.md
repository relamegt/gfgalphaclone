# Contributing Guide

Thank you for your interest in contributing to this project! This guide will help you get started with the development workflow and coding standards.

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)

## 🏁 Getting Started

### Prerequisites

1. **Node.js** >= 18.0.0
   - Use nvm to manage Node versions: `nvm use`
   - The `.nvmrc` file specifies the exact version

2. **pnpm** >= 8.0.0
   - Install globally: `npm install -g pnpm`

3. **Git**
   - Ensure Git is installed and configured

### Initial Setup

1. Fork and clone the repository:

   ```bash
   git clone <your-fork-url>
   cd monorepo-project
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

   This installs dependencies for all workspace packages and sets up Git hooks.

3. Create a `.env` file:

   ```bash
   cp .env.example .env
   ```

   Update with your local configuration values.

4. Verify setup:
   ```bash
   pnpm lint
   pnpm typecheck
   ```

## 📁 Project Structure

The project is organized as a pnpm workspace monorepo:

```
monorepo-project/
├── frontend/                 # React frontend application
│   ├── src/                 # Source code
│   ├── public/              # Static assets
│   ├── package.json         # Frontend dependencies
│   └── tsconfig.json        # TypeScript config
│
├── backend/                  # Express backend API
│   ├── src/                 # Source code
│   │   ├── routes/          # API routes
│   │   ├── controllers/     # Route controllers
│   │   ├── models/          # Data models
│   │   ├── middleware/      # Express middleware
│   │   └── utils/           # Utility functions
│   ├── package.json         # Backend dependencies
│   └── tsconfig.json        # TypeScript config
│
├── services/                 # Shared services
│   ├── judge/               # Code execution judge
│   ├── streaming/           # Streaming helpers
│   ├── package.json         # Services dependencies
│   └── tsconfig.json        # TypeScript config
│
├── .husky/                   # Git hooks
├── .editorconfig            # Editor configuration
├── .eslintrc.json           # ESLint configuration
├── .prettierrc.json         # Prettier configuration
├── .commitlintrc.json       # Commitlint configuration
├── .gitignore               # Git ignore rules
├── .nvmrc                   # Node version
├── package.json             # Root package (workspace config)
├── pnpm-workspace.yaml      # pnpm workspace definition
├── README.md                # Project documentation
└── CONTRIBUTING.md          # This file
```

### Package Naming Convention

Packages use scoped naming:

- `@monorepo/frontend` - Frontend application
- `@monorepo/backend` - Backend API
- `@monorepo/services` - Shared services

### Inter-Package Dependencies

Packages can depend on each other. In a package's `package.json`:

```json
{
  "dependencies": {
    "@monorepo/services": "workspace:*"
  }
}
```

## 🔄 Development Workflow

### Branch Strategy

1. `main` - Production-ready code
2. Feature branches: `feat/<feature-name>`
3. Bug fixes: `fix/<bug-name>`
4. Chores: `chore/<task-name>`

### Creating a New Feature

1. Create a new branch:

   ```bash
   git checkout -b feat/your-feature-name
   ```

2. Make your changes in the appropriate package(s)

3. Run quality checks frequently:

   ```bash
   pnpm lint
   pnpm typecheck
   pnpm test
   ```

4. Commit your changes (see [Commit Guidelines](#commit-guidelines))

5. Push and create a pull request

### Working with Specific Packages

#### Frontend Development

```bash
cd frontend
pnpm dev          # Start dev server
pnpm build        # Build for production
pnpm test         # Run tests
```

#### Backend Development

```bash
cd backend
pnpm dev          # Start dev server
pnpm build        # Build for production
pnpm test         # Run tests
```

#### Services Development

```bash
cd services
pnpm dev          # Start services
pnpm build        # Build for production
pnpm test         # Run tests
```

### Adding Dependencies

#### Root-level dependencies (dev tools):

```bash
pnpm add -D <package-name> -w
```

#### Package-specific dependencies:

```bash
pnpm add <package-name> --filter @monorepo/frontend
pnpm add <package-name> --filter @monorepo/backend
pnpm add <package-name> --filter @monorepo/services
```

## 📝 Coding Standards

### General Principles

1. **Write clear, readable code** - Code is read more than it's written
2. **Follow DRY** - Don't Repeat Yourself
3. **Keep functions small** - Single responsibility principle
4. **Use meaningful names** - Variables, functions, and classes should be self-documenting
5. **Comment complex logic** - But prefer self-documenting code

### TypeScript Guidelines

1. **Always use TypeScript** - Avoid `any` types when possible
2. **Define interfaces** - For objects with known structures
3. **Use type inference** - When types are obvious
4. **Export types** - Share types across packages when needed

Example:

```typescript
// Good
interface User {
  id: string;
  name: string;
  email: string;
}

function getUser(id: string): Promise<User> {
  // implementation
}

// Avoid
function getUser(id: any): any {
  // implementation
}
```

### React Guidelines (Frontend)

1. **Functional components** - Use hooks instead of class components
2. **Custom hooks** - Extract reusable logic into custom hooks
3. **PropTypes via TypeScript** - Define component props with interfaces
4. **File structure** - One component per file

Example:

```typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ label, onClick, disabled = false }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};
```

### Express Guidelines (Backend)

1. **Async/await** - Use async/await instead of callbacks
2. **Error handling** - Always handle errors properly
3. **Middleware** - Keep middleware focused and composable
4. **Route organization** - Group related routes

Example:

```typescript
// Good
router.get('/users/:id', async (req, res, next) => {
  try {
    const user = await userService.getUser(req.params.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
});
```

### Code Formatting

The project uses **Prettier** for automatic formatting. Configuration is in `.prettierrc.json`.

Key rules:

- 2 spaces for indentation
- Single quotes for strings
- Semicolons required
- 80 character line width
- Trailing commas in ES5

Format code:

```bash
pnpm format
```

### Linting

The project uses **ESLint** for code quality. Configuration is in `.eslintrc.json`.

Check and fix linting issues:

```bash
pnpm lint       # Check
pnpm lint:fix   # Fix automatically
```

### Editor Configuration

Use the `.editorconfig` file settings. Most IDEs support it automatically.

## 🧪 Testing Guidelines

### Test Structure

Each package should have tests in a `__tests__` or `tests` directory, or co-located with the source files.

```
src/
├── components/
│   ├── Button.tsx
│   └── Button.test.tsx
```

### Writing Tests

1. **Test behavior, not implementation**
2. **Use descriptive test names**
3. **Follow AAA pattern** - Arrange, Act, Assert
4. **Keep tests isolated** - No shared state between tests

Example:

```typescript
describe('Button component', () => {
  it('should call onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button label="Click me" onClick={handleClick} />);

    fireEvent.click(screen.getByText('Click me'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Running Tests

```bash
# All packages
pnpm test

# Specific package
pnpm --filter @monorepo/frontend test

# Watch mode
pnpm --filter @monorepo/frontend test --watch
```

## 📝 Commit Guidelines

This project follows [Conventional Commits](https://www.conventionalcommits.org/).

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `build`: Build system changes
- `ci`: CI/CD changes
- `chore`: Other changes (dependencies, config, etc.)
- `revert`: Revert a previous commit

### Scopes

- `frontend`: Frontend package
- `backend`: Backend package
- `services`: Services package
- `deps`: Dependencies
- `config`: Configuration

### Examples

```bash
feat(frontend): add user profile component

Implements a new user profile component with avatar upload functionality.

Closes #123
```

```bash
fix(backend): handle null user in authentication middleware

Previously the middleware would crash if user was null.
Now it returns a 401 Unauthorized response.
```

```bash
docs: update setup instructions in README
```

### Commit Hooks

The project uses **Husky** and **lint-staged** for Git hooks:

- **Pre-commit**: Automatically lints and formats staged files
- **Commit-msg**: Validates commit message format

If commits fail, fix the issues and try again. Do not bypass hooks.

## 🔀 Pull Request Process

### Before Creating a PR

1. Ensure all tests pass:

   ```bash
   pnpm test
   ```

2. Ensure code is linted and formatted:

   ```bash
   pnpm lint
   pnpm format
   ```

3. Ensure TypeScript compiles:

   ```bash
   pnpm typecheck
   ```

4. Update documentation if needed

### Creating a PR

1. Push your branch to your fork
2. Create a pull request to the `main` branch
3. Fill out the PR template completely
4. Link related issues
5. Request reviews from maintainers

### PR Title

Follow the same convention as commit messages:

```
feat(backend): add user authentication
```

### PR Description

Include:

- **What**: What changes were made
- **Why**: Why these changes were necessary
- **How**: How the changes work
- **Testing**: How to test the changes
- **Screenshots**: For UI changes

### Review Process

1. Automated checks must pass (linting, tests, build)
2. At least one approval from a maintainer
3. All review comments must be addressed
4. No merge conflicts

### After Merge

1. Delete your feature branch
2. Pull the latest `main` branch
3. Celebrate! 🎉

## 💡 Tips and Best Practices

1. **Keep PRs small** - Easier to review and less likely to introduce bugs
2. **Write tests first** - TDD helps design better APIs
3. **Update docs** - Keep documentation in sync with code
4. **Ask questions** - Better to ask than make wrong assumptions
5. **Review others' code** - Learn from others and help improve code quality

## 🆘 Getting Help

- Check existing issues and documentation
- Ask in project discussions or chat
- Reach out to maintainers

## 📚 Additional Resources

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev/)
- [Express Documentation](https://expressjs.com/)
- [pnpm Documentation](https://pnpm.io/)
- [Conventional Commits](https://www.conventionalcommits.org/)

Thank you for contributing! 🙏
