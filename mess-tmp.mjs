import { chromium } from 'playwright-core';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
for (const [w,h] of [[1920,1080],[1440,900],[1280,720],[834,1112],[390,844]]) {
  const p = await b.newPage({ viewport: { width: w, height: h }, reducedMotion: 'reduce' });
  await p.goto('http://localhost:4399/', { waitUntil: 'networkidle' });
  await p.locator('.consent button').first().click().catch(()=>{});
  await p.waitForTimeout(500);
  console.log(w+'x'+h, await p.evaluate(() => {
    const g = (s) => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return { t: Math.round(r.top), b: Math.round(r.bottom), w: Math.round(r.width) }; };
    const wm = document.querySelector('.hero__wortmarke');
    const bereich = document.createRange(); bereich.selectNodeContents(wm);
    const text = bereich.getBoundingClientRect();
    return { fenster: [window.innerWidth, window.innerHeight],
             hero: g('.hero'), cta: g('.hero__aktionen'), eck: g('.hero__eckdaten'),
             marke_text_breite: Math.round(text.width),
             anteil: (text.width / window.innerWidth).toFixed(3),
             marke_oben: Math.round(text.top) };
  }));
  await p.close();
}
await b.close();
