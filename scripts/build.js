const esbuild = require('esbuild-wasm');

esbuild.build({
  entryPoints: ['src/index.tsx'],
  outdir: 'www',
  bundle: true,
  minify: true,
  format: 'iife',
  target: 'chrome58',
});
