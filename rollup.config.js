import config from './package.json';
import typescript from 'rollup-plugin-typescript2';
import dts from 'rollup-plugin-dts';

export default [
  {
    input: config.source,
    watch: {
      include: 'dist/**'
    },
    output: [
      { file: config.main, format: 'cjs', sourcemap: true, exports: 'named' },
      { file: config.module, format: 'esm', sourcemap: true, exports: 'named' }
    ],
    plugins: [
      typescript({
        compilerOptions: { lib: ['es5', 'es6', 'dom'], target: 'es5' }
      })
    ]
  },
  {
    input: config.source,
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [dts()]
  }
];
