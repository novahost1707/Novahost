import { chromium } from 'playwright-core';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('http://localhost:4399/', { waitUntil: 'networkidle' });
await p.locator('.consent button').first().click().catch(()=>{});
await p.waitForTimeout(400);
const kacheln = await p.evaluate(() => [...document.querySelectorAll('.work__card')].map(a => ({
  ziel: a.getAttribute('href'), tab: a.getAttribute('target'), rel: a.getAttribute('rel'),
  marke: a.querySelector('.work__badge')?.textContent?.trim(),
  titel: a.querySelector('.work__title')?.textContent?.trim(),
  foto: !!a.querySelector('.work__foto'),
})));
console.log(JSON.stringify(kacheln, null, 1));
const alt = await p.evaluate(() => document.querySelector('.work__foto')?.getAttribute('alt'));
console.log('Alt-Text:', alt);
await b.close();
