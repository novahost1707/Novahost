import { chromium } from 'playwright-core';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const D = '/tmp/claude-0/-home-user-Novahost/0159f369-13d8-5b0e-96ec-699324a1760e/scratchpad/shots/';
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
const p = await ctx.newPage();
for (const z of process.argv.slice(2)) {
  const [url, sel, name] = z.split('|');
  await p.goto('http://localhost:4399' + url, { waitUntil: 'networkidle' });
  await p.locator('.consent button').first().click().catch(()=>{});
  await p.waitForTimeout(600);
  await p.locator(sel).first().scrollIntoViewIfNeeded();
  await p.waitForTimeout(500);
  await p.locator(sel).first().screenshot({ path: D + name + '.png' });
  console.log(name);
}
await b.close();
