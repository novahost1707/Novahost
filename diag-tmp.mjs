import { chromium } from 'playwright-core';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('http://localhost:4399/', { waitUntil: 'networkidle' });
await p.locator('.consent button').first().click().catch(()=>{});
for (const [y, wie] of [[0,'oben'],[3000,'runter'],[2900,'kurz hoch']]) {
  await p.evaluate(yy => window.scrollTo(0, yy), y);
  await p.waitForTimeout(600);
  console.log(wie, await p.evaluate(() => {
    const h = document.querySelector('.header');
    const b = document.querySelector('.header__brand').getBoundingClientRect();
    return { hidden: h.dataset.hidden, kopf: getComputedStyle(h).transform.slice(0,40), marke: [Math.round(b.top), Math.round(b.bottom)] };
  }));
}
await b.close();
