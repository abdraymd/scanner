import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';

const input = ['src/index.ts'];
const externalZbarId = 'https://cdn.jsdelivr.net/npm/@undecaf/zbar-wasm@0.9.14/dist/main.js';

export default [
    // UMD
    {
        input,
        external: [externalZbarId],
        plugins: [
            typescript(),
            nodeResolve({ browser: true }),
            babel({
                exclude: 'node_modules/**',
                babelHelpers: 'bundled'
            }),
            terser()
        ],
        output: {
            file: `dist/index.min.js`,
            format: 'umd',
            name: 'scanner',
            esModule: false,
            exports: 'named',
            sourcemap: true,
            globals: {
                [externalZbarId]: 'externalZbarLibrary'
            }
        }
    },

    // ESM
    {
        input,
        plugins: [
            typescript({
                compilerOptions: {
                    outDir: './dist/esm',
                    declarationDir: './dist/esm'
                }
            }),
            nodeResolve()
        ],
        output: {
            dir: 'dist/esm',
            format: 'esm',
            exports: 'named',
            sourcemap: true,
            globals: {
                [externalZbarId]: 'externalZbarLibrary'
            }
        }
    }
];
