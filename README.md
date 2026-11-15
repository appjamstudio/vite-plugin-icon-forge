# vite-plugin-icon-forge

A Vite plugin that automatically transforms SVG files into React components with TypeScript support, allowing easy import and use of SVG icons in your React applications.

## Features

- 🔄 **Automatic transformation** - SVGs are converted to React components on-the-fly
- 📁 **Directory scanning** - Automatically generates barrel exports for organized icon imports
- 🔥 **Hot reload** - Icon changes are reflected immediately during development
- 🎯 **TypeScript support** - Full type safety with generated TypeScript declarations
- ⚙️ **Configurable** - Customize component naming, directories, and SVGR options
- 🚀 **Zero runtime** - Icons are transformed at build time

## Installation

```bash
npm install @appjamstudio/vite-plugin-icon-forge
```

## Usage

### 1. Configure the plugin

Add the plugin to your `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import iconForge from '@appjamstudio/vite-plugin-icon-forge'

export default defineConfig({
  plugins: [
    react(),
    iconForge({
      iconsDirectory: 'src/icons', // Default: 'src/icons'
      iconSuffix: 'Icon',          // Default: 'Icon'
      iconPrefix: '',              // Default: ''
    })
  ],
})
```

### 2. Organize your SVG files

Place your SVG files in the configured directory with subdirectories for organization:

```
src/
  icons/
    basic/
      heart.svg
      star.svg
    social/
      github.svg
      twitter.svg
```

### 3. Import and use your icons

The plugin automatically generates barrel exports, so you can import icons cleanly:

```tsx
import { HeartIcon, StarIcon } from './icons/basic'
import { GithubIcon, TwitterIcon } from './icons/social'

function App() {
  return (
    <div>
      <HeartIcon style={{ color: 'red' }} />
      <StarIcon style={{ color: 'gold' }} />
      <GithubIcon style={{ color: '#333' }} />
      <TwitterIcon style={{ color: '#1da1f2' }} />
    </div>
  )
}
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `iconsDirectory` | `string` | `'src/icons'` | Directory containing your SVG files |
| `iconSuffix` | `string` | `'Icon'` | Suffix added to component names |
| `iconPrefix` | `string` | `''` | Prefix added to component names |
| `svgrOptions` | `Config` | `undefined` | Options passed to SVGR for transformation |

## How it works

1. **Scanning**: The plugin scans your icons directory for SVG files
2. **Barrel generation**: Creates `index.ts` files in each subdirectory for clean imports
3. **Transformation**: Uses SVGR to convert SVGs to React components when imported
4. **Hot reload**: Watches for file changes and regenerates barrels automatically

## Example Project Structure

```
my-app/
├── src/
│   ├── icons/
│   │   ├── basic/
│   │   │   ├── heart.svg
│   │   │   ├── star.svg
│   │   │   └── index.ts          # Auto-generated
│   │   └── social/
│   │       ├── github.svg
│   │       ├── twitter.svg
│   │       └── index.ts          # Auto-generated
│   └── App.tsx
├── vite.config.ts
└── package.json
```

## Requirements

- Vite 8.0+
- React 16.8+
- Node.js 22+

## Peer Dependencies

- `@svgr/core` (optional) - For SVG transformation. The plugin will use a default configuration if not installed.

## License

MIT

## Contributing

Issues and pull requests are welcome! Please visit our [GitHub repository](https://github.com/appjamstudio/vite-plugin-icon-forge).
