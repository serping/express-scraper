// esbuild.config.js
const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['app/index.ts'],
  bundle: true,
  platform: 'node',
  target: 'node20',
  outdir: 'dist',
  loader: {
    '.node': 'file'
  },
}).catch(() => process.exit(1));
