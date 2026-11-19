/* eslint-disable @typescript-eslint/no-require-imports -- Node regression tests with mocked email transport. */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const source = fs.readFileSync(path.join(__dirname,'../app/api/contact/route.ts'),'utf8');
const code = ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
function handler(settings, failCms = false) {
  const result={exports:{}}; let sent;
  new Function('require','module','exports','fetch',code)(() => ({client:{fetch:async()=>{if(failCms)throw Error('offline');return settings;}}}),result,result.exports,async(url,options)=>{
    assert.equal(url,'https://api.resend.com/emails');sent=JSON.parse(options.body);return Response.json({id:'mock'});
  });
  return {POST:result.exports.POST, sent:()=>sent};
}
async function submit(server) {
  const apiKey=process.env.RESEND_API_KEY,sender=process.env.RESEND_FROM_EMAIL;
  process.env.RESEND_API_KEY='fake-unit-test-key';process.env.RESEND_FROM_EMAIL='website@example.com';
  try {return await server.POST(new Request('http://localhost/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:'visitor@example.com',message:'Hello team',recipient:'attacker@example.com'})}));}
  finally {if(apiKey===undefined)delete process.env.RESEND_API_KEY;else process.env.RESEND_API_KEY=apiKey;if(sender===undefined)delete process.env.RESEND_FROM_EMAIL;else process.env.RESEND_FROM_EMAIL=sender;}
}
test('normal hosting sends to the published contact email and ignores visitor-supplied recipients', async()=>{
  const server=handler({email:'client@example.com'});assert.equal((await submit(server)).status,200);assert.deepEqual(server.sent().to,['client@example.com']);
});
test('missing or unavailable CMS settings retain the original email delivery recipient', async()=>{
  for(const server of [handler(null),handler(null,true),handler({email:'invalid'})]){assert.equal((await submit(server)).status,200);assert.deepEqual(server.sent().to,['bakeryservice@alarak.com']);}
});
