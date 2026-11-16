/* eslint-disable @typescript-eslint/no-require-imports -- Executable Node CommonJS script. */
const path = require('node:path');
const fs = require('node:fs');
const {createClient} = require('@sanity/client');

for (const name of ['.env.local', '.env']) {
  const file = path.join(__dirname, '..', name);
  if (fs.existsSync(file)) process.loadEnvFile(file);
}
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'z12n5wz6';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const client = createClient({projectId, dataset, apiVersion: '2026-11-15', perspective: 'published',
  useCdn: false, timeout: 6000, maxRetries: 0, withCredentials: false});
client.fetch('*[_type == "homePage"]{_id}').then(async documents => {
  console.log(`Anonymous Sanity connection OK: ${projectId}/${dataset}. Published Home Page documents: ${documents.length}.`);
  if (!documents.length) console.log('Publish Home Page in the Studio; the website currently uses its original Hero.');
  const query = new URL(`https://${projectId}.api.sanity.io/v2026-11-15/data/query/${dataset}`);
  query.searchParams.set('query', 'count(*[_type == "homePage"])');
  query.searchParams.set('perspective', 'published');
  for (const origin of ['https://alarak.ma', 'https://www.alarak.ma', 'http://localhost:3000', 'http://localhost:4173']) {
    const response = await fetch(query, {headers: {Origin: origin}, credentials: 'omit', signal: AbortSignal.timeout(6000)});
    const allowed = response.headers.get('access-control-allow-origin');
    if (!response.ok || (allowed !== '*' && allowed !== origin)) {
      console.error(`CORS check failed for ${origin} (HTTP ${response.status}); allow this origin in Sanity with credentials OFF.`);
      process.exitCode = 1;
    } else console.log(`Public CORS OK: ${origin}`);
  }
}).catch(error => {
  console.error(`Sanity connection failed: ${error.message}`);
  process.exitCode = 1;
});
