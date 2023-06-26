import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';

const input = ['src/index.ts'];

export default [
    // UMD
    {
        input,
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
            sourcemap: true
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
            sourcemap: true
        }
    }
];
