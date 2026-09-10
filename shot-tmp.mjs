import { chromium } from 'playwright-core';
const D = '/tmp/claude-0/-home-user-Novahost/0159f369-13d8-5b0e-96ec-699324a1760e/scratchpad/shots/';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
for (const [w,h,tag] of [[1440,900,'d'],[390,844,'m']]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, reducedMotion: 'reduce', deviceScaleFactor: w > 1000 ? 1 : 2 });
  const p = await ctx.newPage();
  await p.goto('http://localhost:4399/', { waitUntil: 'networkidle' });
  await p.locator('.consent button').first().click().catch(()=>{});
  await p.waitForTimeout(600);
  await p.screenshot({ path: `${D}${process.argv[2]}-${tag}.png` });
  await ctx.close();
}
await b.close(); console.log('ok');
