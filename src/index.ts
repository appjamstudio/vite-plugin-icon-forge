import { promises as fs } from 'node:fs';

import type { Config } from '@svgr/core';
import { camelCase, upperFirst } from 'lodash-es';
import path from 'path';
import { Plugin, transformWithEsbuild } from 'vite';

type PluginOptions = {
  iconsDirectory?: string;
  svgrOptions?: Config;
  iconSuffix?: string;
  iconPrefix?: string;
};

type IconInfo = {
  name: string;
  componentName: string;
  relativePath: string;
  absolutePath: string;
};

type DirectoryInfo = {
  path: string;
  icons: IconInfo[];
};

const SVGR_SEARCH_STRING = '?icon-forge';

export default function iconForge(options: PluginOptions = {}): Plugin {
  const {
    iconsDirectory = 'src/icons',
    svgrOptions,
    iconSuffix = 'Icon',
    iconPrefix = ''
  } = options;

  let root: string;
  let iconsPath: string;

  return {
    name: 'app-jam-studio:icon-forge',
    enforce: 'pre',

    configResolved(config) {
      root = config.root;
      iconsPath = path.resolve(root, iconsDirectory);

      console.log(`📁 Icons directory: ${iconsPath}`);
    },

    async buildStart() {
      console.log(`🔍 Scanning for SVG directories and generating barrels...`);
      await generateBarrelFiles(iconsPath, iconSuffix, iconPrefix, iconsDirectory);
    },

    resolveId(id, importer) {
      // handle SVGR transformations
      if (id.includes(SVGR_SEARCH_STRING)) {
        // If the id is a relative import, resolve it relative to the importer
        if (id.startsWith('./') && importer) {
          return path.resolve(path.dirname(importer), id);
        }
        return id;
      }
    },

    async load(id) {
      if (!id.includes(SVGR_SEARCH_STRING)) return;

      const filePath = id.replace(SVGR_SEARCH_STRING, '');

      // Handle SVGR transformations
      try {
        const svgContent = await fs.readFile(filePath, 'utf-8');

        const { transform } = await import('@svgr/core');
        const { default: jsx } = await import('@svgr/plugin-jsx');

        const componentCode = await transform(
          svgContent,
          svgrOptions,
          {
            filePath,
            caller: {
              defaultPlugins: [jsx]
            }
          });

        const result = await transformWithEsbuild(componentCode, id, {
          loader: 'jsx'
        });

        return {
          code: result.code,
          map: result.map
        };
      } catch (error) {
        console.error(`❌ Error transforming SVG ${filePath}: `, error);
        throw error;
      }
    },

    configureServer(server) {
      server.watcher.add(iconsPath);

      const handleChange = async (filePath: string) => {
        // Only process SVG files, ignore all other files, especially our barrels; otherwise we get infinite rebuilds
        if (!filePath.endsWith('.svg')) return;

        // Make sure the files exist in our icons directory: sanity-check
        if (!filePath.startsWith(iconsPath)) return;

        console.log(`🔄 SVG file changed: ${path.relative(iconsPath, filePath)}`);

        try {
          await generateBarrelFiles(iconsPath, iconSuffix, iconPrefix, iconsDirectory);
          console.log(`✅ Barrel files regenerated`);
        } catch (error) {
          console.error(`❌ Error generating barrel files: `, error);
        }
      };

      server.watcher.on('change', handleChange);
      server.watcher.on('add', handleChange);
      server.watcher.on('unlink', handleChange);
    }
  };
}

async function generateBarrelFiles(iconsPath: string, iconSuffix: string, iconPrefix: string, iconsDirectory: string) {
  const directories = await scanDirectoriesForSvgs(iconsPath, iconPrefix, iconSuffix);

  for (const directory of directories) {
    // Skip any directories that got added but have no icons
    if (directory.icons.length === 0) continue;

    const barrelPath = path.join(directory.path, 'index.ts');
    const barrelContent = generateBarrelContent(directory.icons, directory.path, iconsPath, iconsDirectory);

    await fs.writeFile(barrelPath, barrelContent);
    console.log(`📦 Generated barrel: ${path.relative(iconsPath, barrelPath)} (${directory.icons.length} icons)`);
  }
}

async function scanDirectoriesForSvgs(iconsPath: string, iconPrefix: string, iconSuffix: string) {
  const directories: DirectoryInfo[] = [];

  async function scanDirectory(directoryPath: string) {
    try {
      const items = await fs.readdir(directoryPath, { withFileTypes: true });

      const icons: IconInfo[] = [];

      // Look for SVG files in this directory
      for (const item of items) {
        const fullPath = path.join(directoryPath, item.name);

        if (item.isFile() && path.extname(item.name) === '.svg') {
          const iconName = path.parse(item.name).name;
          const componentName = makeComponentName(iconName, iconPrefix, iconSuffix);

          icons.push({
            name: item.name,
            componentName,
            relativePath: `./${item.name}`,
            absolutePath: fullPath
          });
        }
      }

      // If this directory has SVGs, add it to the list
      if (icons.length > 0) {
        directories.push({
          path: directoryPath,
          icons
        });
      }

      // Recursively scan sub-directories
      for (const item of items) {
        if (item.isDirectory()) {
          await scanDirectory(path.join(directoryPath, item.name));
        }
      }
    } catch (error) {
      console.warn(`Could not scan directory: ${directoryPath}`);
    }
  }

  await scanDirectory(iconsPath);
  return directories;
}

function generateBarrelContent(icons: IconInfo[], directoryPath: string, iconsRoot: string, iconsDirectory: string) {
  const relativePath = path.relative(iconsRoot, directoryPath);
  const displayPath = relativePath || 'root';

  const fullImportPath = relativePath
    ? path.join(iconsDirectory, relativePath).replace(/\\/g, '/')
    : iconsDirectory;

  const header = `// Auto-generated barrel file for ${displayPath}
// Do not edit manually - this file is regenerated when SVGs change
//
// Usage:
// import { ${icons[0]?.componentName || 'Icon'} } from '${fullImportPath}';
`;

  // Generate exports
  const exports = icons.map(icon =>
    `export { default as ${icon.componentName} } from '${icon.relativePath}${SVGR_SEARCH_STRING}';`
  ).join('\n');

  return header + '\n' + exports + '\n';
}

function pascalCase(str: string) {
  return (upperFirst(camelCase(str)));
}

function makeComponentName(...args: string[]) {
  const parts = [...args];

  return parts.map(pascalCase).join('');
}
