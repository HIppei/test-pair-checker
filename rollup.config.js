import typescript from '@rollup/plugin-typescript';
import nodeExternals from 'rollup-plugin-node-externals';
import terser from '@rollup/plugin-terser';

const plugins = [typescript(), nodeExternals(), terser({ format: { comments: false } })];

/** @type {import('rollup').RollupOptions} */
const cliConfig = {
  input: 'src/index.ts',
  output: {
    dir: 'dist/bin',
    strict: true,
  },
  plugins,
};

export default [cliConfig];

// const input = 'src/test-pair-checker.ts';
// /** @type {import('rollup').RollupOptions} */
// const esmConfig = {
//   input: 'src/test-pair-checker.ts',
//   output: {
//     dir: 'dist/esm',
//     sourcemap: true,
//     strict: true,
//   },
//   plugins,
// };

// /** @type {import('rollup').RollupOptions} */
// const cjsConfig = {
//   input: 'src/test-pair-checker.ts',
//   output: {
//     dir: 'dist/cjs',
//     format: 'cjs',
//     sourcemap: true,
//     strict: true,
//   },
//   plugins,
// };
