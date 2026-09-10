import { chromium } from 'playwright-core';
const B = 'http://localhost:4399';
const SEITEN = ['/', '/impressum', '/datenschutz', '/widerruf', '/demo/cafe', '/demo/handwerk', '/demo/restaurant', '/demo/mode', '/demo/mode/warenkorb'];
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const probleme = [];
for (const [w, h, name] of [[1440, 900, 'desktop'], [390, 844, 'mobil']]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h } });
  for (const pfad of SEITEN) {
    const p = await ctx.newPage();
    const fehler = [];
    p.on('console', m => { if (m.type() === 'error') fehler.push(m.text()); });
    p.on('pageerror', e => fehler.push('pageerror: ' + e.message));
    const r = await p.goto(B + pfad, { waitUntil: 'networkidle' });
    if (r.status() !== 200) probleme.push(`${name} ${pfad}: HTTP ${r.status()}`);
    const ov = await p.evaluate(() => {
      const d = document.documentElement;
      const gek = (el) => { let c = el.parentElement; while (c && c !== document.body) { const s = getComputedStyle(c); if (s.overflowX !== 'visible' || s.position === 'fixed') return true; c = c.parentElement; } return false; };
      const raus = [];
      for (const el of document.querySelectorAll('body *')) {
        const c = el.getBoundingClientRect();
        if (c.width > 0 && (c.right > d.clientWidth + 1.5 || c.left < -1.5)) {
          if (getComputedStyle(el).position === 'fixed' || gek(el)) continue;
          raus.push(el.tagName.toLowerCase() + '.' + (el.className?.toString?.().split(' ')[0] || ''));
        }
      }
      return { sw: d.scrollWidth, cw: d.clientWidth, raus: raus.slice(0, 3) };
    });
    if (ov.sw > ov.cw + 1) probleme.push(`${name} ${pfad}: Überlauf ${ov.sw}>${ov.cw} :: ${ov.raus.join(' | ')}`);
    if (fehler.length) probleme.push(`${name} ${pfad}: JS ${JSON.stringify(fehler.slice(0,2))}`);
    await p.close();
  }
  await ctx.close();
}
await b.close();
console.log(probleme.length ? probleme.join('\n') : 'keine Probleme');
