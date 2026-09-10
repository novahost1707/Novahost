import { chromium } from 'playwright-core';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
for (const [w,h] of [[1440,900],[1280,720],[390,844]]) {
  const p = await b.newPage({ viewport: { width: w, height: h }, reducedMotion: 'reduce' });
  await p.goto('http://localhost:4399/', { waitUntil: 'networkidle' });
  await p.locator('.consent button').first().click().catch(()=>{});
  await p.waitForTimeout(500);
  console.log(w+'x'+h, await p.evaluate(() => {
    const g = (s) => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return [Math.round(r.top), Math.round(r.bottom)]; };
    return { hero: g('.hero'), marke: g('.hero__marke'), titel: g('.hero__title'), sub: g('.hero__sub'),
             cta: g('.hero__actions .btn-row'), meta: g('.hero__meta'), fenster: window.innerHeight };
  }));
  await p.close();
}
await b.close();
