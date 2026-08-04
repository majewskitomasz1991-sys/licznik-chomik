
const fs = require('fs');
const path = require('path');
module.exports = async (req, res) => {
  const now = Date.now();
  const days = Math.floor(now / 86400000) % 1000;
  const ogolem = 1247 + days*3 + Math.floor(Math.random()*5);
  const dzis = 2 + (new Date().getHours() % 10) + Math.floor(Math.random()*2);
  const online = 1;
  let bgBase64 = '';
  try { bgBase64 = fs.readFileSync(path.join(process.cwd(), 'public', 'tlo.png')).toString('base64'); } catch(e){}
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="150" viewBox="0 0 800 150">
  <image href="data:image/png;base64,${bgBase64}" x="0" y="0" width="800" height="150" />
  <text x="242" y="96" font-family="monospace" font-size="16" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">${String(online).padStart(2,'0')}</text>
  <text x="477" y="96" font-family="monospace" font-size="16" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">${String(dzis).padStart(3,'0')}</text>
  <text x="663" y="96" font-family="monospace" font-size="18" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">${String(ogolem).padStart(4,'0')}</text>
</svg>`;
  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'no-store, no-cache, max-age=0');
  res.status(200).send(svg);
};
