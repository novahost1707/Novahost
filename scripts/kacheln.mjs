/**
 * Nimmt die Demo-Seiten fuer die Kacheln im Projektraster auf.
 *
 * Die Kacheln stehen im Format 16/11, und genau so wird aufgenommen - dann
 * muss beim Einsetzen nichts beschnitten werden. 1760x1210 ist die doppelte
 * Anzeigebreite, damit die Bilder auch auf feinen Bildschirmen scharf sind.
 *
 * Aufruf: Anwendung bauen, starten, dann
 *   npm install --no-save playwright-core
 *   node scripts/kacheln.mjs
 *
 * Die Aufnahme des Kundenprojekts entsteht nicht hier - die kommt von der
 * veroeffentlichten Seite.
 */
import { chromium } from 'playwright-core';
const B = 'http://localhost:4399';
const BREITE = 1760, HOEHE = 1210;
const D = '/home/user/Novahost/public/work/';

const seiten = [
  ['/demo/mode', 'arvo'],
  ['/demo/handwerk', 'brandhorst'],
  ['/demo/restaurant', 'amsel'],
];

const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const ctx = await b.newContext({ viewport: { width: BREITE, height: HOEHE }, reducedMotion: 'reduce', deviceScaleFactor: 1 });
for (const [pfad, name] of seiten) {
  const p = await ctx.newPage();
  await p.goto(B + pfad, { waitUntil: 'networkidle' });
  // Der Demo-Balken gehoert zum Rahmen, nicht zur gezeigten Seite.
  await p.evaluate(() => document.querySelector('.demobar')?.remove());
  await p.waitForTimeout(700);
  await p.screenshot({ path: D + name + '.png' });
  console.log(name);
  await p.close();
}
await b.close();
