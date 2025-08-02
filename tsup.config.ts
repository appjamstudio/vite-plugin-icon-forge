import type {Options} from 'tsup';

export const tsup: Options = {
    splitting: true,
    clean: true,
    dts: true,
    entry: ['src/*.ts'],
    format: ['cjs', 'esm'],
    external: ['vite', '@svgr/core', '@svgr/plugin-jsx', 'lodash-es'],
}