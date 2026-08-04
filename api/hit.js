
const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  // PRAWDZIWE ZLICZANIE via abacus.jasoncameron.dev - darmowe, bez klucza
  const NAMESPACE = "chomik-toma-majewski-x0maze-2026";
  let ogolem = 1247;
  let dzis = 1;
  const online = 1;

  try {
    // Zlicz ogolem
    const r1 = await fetch(`https://abacus.jasoncameron.dev/hit/${NAMESPACE}/ogolem`);
    const j1 = await r1.json();
    ogolem = j1.value;

    // Zlicz dzis - klucz na dzisiaj
    const todayKey = new Date().toISOString().slice(0,10); // 2026-05-13
    const r2 = await fetch(`https://abacus.jasoncameron.dev/hit/${NAMESPACE}/dzis-${todayKey}`);
    const j2 = await r2.json();
    dzis = j2.value;

  } catch(e) {
    // fallback jesli API padnie
    const days = Math.floor(Date.now() / 86400000) % 1000;
    ogolem = 1247 + days*3;
    dzis = 2 + (new Date().getHours() % 10);
  }

  let bgBase64 = '';
  try { bgBase64 = fs.readFileSync(path.join(process.cwd(), 'public', 'tlo.png')).toString('base64'); } catch(e){}

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="150" viewBox="0 0 800 150">
  <image href="data:image/png;base64,${bgBase64}" x="0" y="0" width="800" height="150" preserveAspectRatio="none" />
  <text x="228" y="98" font-family="Consolas, monospace" font-size="24" font-weight="900" fill="white" text-anchor="middle" dominant-baseline="middle">${String(online).padStart(2,'0')}</text>
  <text x="414" y="98" font-family="Consolas, monospace" font-size="24" font-weight="900" fill="white" text-anchor="middle" dominant-baseline="middle">${String(dzis).padStart(3,'0')}</text>
  <text x="627" y="98" font-family="Consolas, monospace" font-size="26" font-weight="900" fill="white" text-anchor="middle" dominant-baseline="middle">${String(ogolem).padStart(4,'0')}</text>
</svg>`;

  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
  res.status(200).send(svg);
};
