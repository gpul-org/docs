# Contributing to GPUL Web

We love your input! We want to make contributing to GPUL Web as easy and transparent as possible.

## Our Pledge

We as members, contributors, and leaders pledge to make participation in our community a harassment-free experience for everyone. Please read our [Code of Conduct](CODE_OF_CONDUCT.md) for more details.

## How to Contribute

### 1. Fork the Repository

- Fork the repository to your GitHub account
- Clone your fork locally

```bash
git clone https://github.com/YOUR_USERNAME/web.git
cd web
```

### 2. Set Up Your Development Environment

- Install the required tools (Node.js 22+ and pnpm 10+)
- Install dependencies

```bash
pnpm install
```

### 3. Create a New Branch

- Create a new branch for your feature/fix

```bash
git checkout -b type/description
```

Where `type` is one of:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code changes that neither fix bugs nor add features
- `perf`: Performance improvements
- `test`: Adding or modifying tests
- `chore`: Changes to the build process or auxiliary tools

### 4. Make Your Changes

- Make your changes following our code style
- Write or update tests as needed
- Update documentation as needed

### 5. Commit Your Changes

We use [Conventional Commits](https://www.conventionalcommits.org/) for our commit messages. The format should be:

```plaintext
type(scope): description

[optional body]

[optional footer]
```

Examples:

```plaintext
feat(auth): add login functionality
fix(api): handle null response from server
docs(readme): update installation instructions
```

### Code Quality and Pre-Commit Hooks

To help maintain code quality and consistent formatting, this project includes pre-commit hooks that run [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) on staged files before a commit is made. The same linting and formatting is being run on CI.

These hooks can be disabled (opt-out) to give developers flexibility in their workflow, however, we encourage its use, to avoid having to re-do commits to pass CI.

### How It Works

- **ESLint**: Checks for potential bugs and enforces code style rules. If any errors are found, **the commit will be aborted**, and you will need to fix the errors manually before trying to commit again.
- **Prettier**: Automatically formats your code to ensure a consistent style across the entire codebase.

### How to Disable the Hooks

Hooks are pre-enabled on the repo. If for any reason, you wish to disable the

1.  Navigate to the root directory of the project in your terminal.
2.  Create the opt-out file by running the following command:

    ```bash
    touch .opt-out-hooks
    ```

If you decide you want the hooks to run again, simply delete the `.opt-out-hooks` file.

### 6. Push Your Changes

```bash
git push origin type/description
```

### 7. Create a Pull Request

- Go to the original repository
- Click "New Pull Request"
- Select your branch
- Fill in the PR template
- Submit the PR

## Review Process

All changes, regardless of size, will be reviewed by a member of the current GPUL board before being merged. This ensures:

- Code quality and consistency
- Alignment with project goals
- Security and stability
- Proper documentation

The review process may include:

- Code review
- Testing
- Documentation review
- Security assessment

## Getting Help

If you need help at any point:

- Open an issue
- Join our community chat
- Contact the maintainers

## Thank You!

Thank you for considering contributing to GPUL Web. Your contributions help make our community stronger!
