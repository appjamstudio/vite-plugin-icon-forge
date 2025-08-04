# Contributing to vite-plugin-icon-forge

Thank you for your interest in contributing! This document outlines the development and release process.

## Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/appjamstudio/vite-plugin-icon-forge.git
   cd vite-plugin-icon-forge
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start development:
   ```bash
   npm run dev
   ```

## Development Workflow

- **Build**: `npm run build` - Compiles TypeScript and generates dist files
- **Lint**: `npm run lint` - Runs ESLint to check code quality
- **Fix linting**: `npm run lint:fix` - Automatically fixes linting issues
- **Test example**: `npm run example:dev` - Runs the example project for testing

## Release Workflow

### Prerequisites (One-time setup)
1. **npm authentication**: `npm login` to authenticate with npm registry
2. **Git setup**: Ensure you're on the main branch with clean working directory
3. **Repository access**: Make sure the GitHub repository exists and you have push access

### Release Process

#### 1. **Pre-release checks**
```bash
# Ensure clean working directory
git status

# Run quality checks
npm run lint
npm run build

# Test the build output
ls -la dist/
```

#### 2. **Create release** 
```bash
npm run release
```

This single command:
- Uses `bumpp` to bump the version in package.json
- Prompts you to select version type (patch/minor/major)
- Creates a git commit with the version bump  
- Creates a git tag
- Publishes to npm registry

#### 3. **Post-release**
```bash
# Push changes and tags to GitHub
git push origin main --follow-tags
```

### Version Selection Guide

- **Patch (0.0.x)**: Bug fixes, minor tweaks
- **Minor (0.x.0)**: New features, backward compatible
- **Major (x.0.0)**: Breaking changes

### Alternative: Manual Process

If you prefer more control:

```bash
# 1. Version bump only
npx bumpp

# 2. Build and test
npm run build
npm run lint

# 3. Publish
npm publish

# 4. Push to git
git push origin main --follow-tags
```

### Safety Notes

- **Dry run**: Use `npm publish --dry-run` to test publishing without actually publishing
- **Beta versions**: Consider `0.1.0-beta.1` for pre-release testing
- **Registry check**: Verify your package appears correctly on npmjs.com after publishing

## Code Style

- Follow the existing ESLint configuration
- Use TypeScript for type safety
- Write clear, descriptive commit messages
- Keep changes focused and atomic

## Pull Requests

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Run tests and linting: `npm run lint && npm run build`
5. Commit your changes with clear messages
6. Push to your fork and create a pull request

## Issues

When reporting issues, please include:
- Node.js version
- Package version
- Minimal reproduction example
- Expected vs actual behavior