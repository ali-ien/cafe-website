/* eslint-disable @typescript-eslint/no-require-imports -- Node build entry point. */
const {spawnSync} = require('node:child_process');
const result = spawnSync(process.execPath, [require.resolve('next/dist/bin/next'), 'build', '--webpack'], {
  stdio: 'inherit',
  env: {...process.env, ALARAK_STATIC_EXPORT: '1'},
});
if (result.error) console.error(result.error.message);
process.exitCode = result.status ?? 1;
