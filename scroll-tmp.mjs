import { chromium } from 'playwright-core';
const B = 'http://localhost:4399';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const ok = [], fehler = [];
const pruefe = (c, t) => (c ? ok.push(t) : fehler.push('FEHLGESCHLAGEN: ' + t));
const kopfZeigen = async (p) => {
  // Der Kopf blendet beim Abwaertsscrollen aus und kommt beim Hochscrollen
  // zurueck. Fuer den Klick muss er also erst wieder da sein.
  for (let i = 0; i < 8; i++) {
    await p.mouse.wheel(0, -160);
    await p.waitForTimeout(120);
  }
  await p.waitForSelector('.header[data-hidden="false"]', { timeout: 5000 });
  await p.waitForTimeout(300);
};

const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
await p.goto(B + '/', { waitUntil: 'networkidle' });
await p.locator('.consent button').first().click().catch(() => {});
await p.waitForTimeout(300);

// 1. Nach dem Runterscrollen und Neuladen wieder oben
await p.evaluate(() => window.scrollTo(0, 3000));
await p.waitForTimeout(900);
pruefe(await p.evaluate(() => window.scrollY) > 2000, 'Vorbedingung: Seite ist heruntergescrollt');
await p.reload({ waitUntil: 'networkidle' });
await p.waitForTimeout(700);
const nachReload = await p.evaluate(() => window.scrollY);
pruefe(nachReload < 5, `Neuladen landet oben (scrollY ${nachReload})`);

// 2. Anker beim Neuladen bleibt erhalten
await p.goto(B + '/#projekte', { waitUntil: 'networkidle' });
await p.waitForTimeout(700);
const beiAnker = await p.evaluate(() => window.scrollY);
await p.reload({ waitUntil: 'networkidle' });
await p.waitForTimeout(900);
const nachAnkerReload = await p.evaluate(() => window.scrollY);
pruefe(nachAnkerReload > 200, `Anker überlebt das Neuladen (scrollY ${nachAnkerReload}, vorher ${beiAnker})`);

// 3. Klick auf die Wortmarke führt nach oben
await p.goto(B + '/', { waitUntil: 'networkidle' });
await p.evaluate(() => window.scrollTo(0, 3000));
await p.waitForTimeout(400);
await kopfZeigen(p);
await p.locator('.header__brand').click();
await p.waitForTimeout(1400);
const nachKlick = await p.evaluate(() => window.scrollY);
pruefe(nachKlick < 5, `Klick auf die Wortmarke führt nach oben (scrollY ${nachKlick})`);

// 4. Anker in der Adresse wird dabei entfernt
await p.goto(B + '/#projekte', { waitUntil: 'networkidle' });
await p.waitForTimeout(600);
await kopfZeigen(p);
await p.locator('.header__brand').click();
await p.waitForTimeout(1400);
pruefe(!(await p.evaluate(() => window.location.hash)), 'Anker wird beim Klick auf die Wortmarke entfernt');
pruefe(await p.evaluate(() => window.scrollY) < 5, 'und die Seite steht oben');

// 5. Dreifachklick oeffnet weiterhin das Spiel
await p.goto(B + '/', { waitUntil: 'networkidle' });
await p.locator('.header__brand').click({ clickCount: 3, delay: 60 });
await p.waitForTimeout(700);
const spiel = await p.locator('.dino, [class*="dino"]').count();
pruefe(spiel > 0, `Dreifachklick öffnet weiterhin das Spiel (${spiel} Treffer)`);

await b.close();
console.log(ok.map(t => '  ✓ ' + t).join('\n'));
console.log(fehler.length ? '\n' + fehler.join('\n') : `\nAlle ${ok.length} Prüfungen bestanden.`);
