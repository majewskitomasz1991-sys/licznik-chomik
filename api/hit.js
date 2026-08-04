const { createCanvas, loadImage, registerFont } = require('canvas');
const path = require('path');

module.exports = async (req, res) => {
  // --- LICZNIKI ---
  let ogolem = 0, dzis = 0;
  const NAMESPACE = 'repack-games-uczciwy-0'; // ZMIEN NA SWOJA NAZWE ZEBY ZACZAC OD 0
  try {
    const r1 = await fetch(`https://api.countapi.xyz/hit/${NAMESPACE}/ogolem`);
    const j1 = await r1.json();
    ogolem = j1.value || 0;
    
    const data = new Date().toISOString().slice(0,10);
    const r2 = await fetch(`https://api.countapi.xyz/hit/${NAMESPACE}/dzis-${data}`);
    const j2 = await r2.json();
    dzis = j2.value || 0;
  } catch(e) {
    console.log(e);
  }

  // Online fake 1-4 dla efektu (prawdziwy online wymaga bazy Redis)
  const online = Math.floor(Math.random()*3)+1;

  // --- RYSOWANIE ---
  const canvas = createCanvas(800, 150);
  const ctx = canvas.getContext('2d');

  // tlo.png z folderu public
  const bgPath = path.join(process.cwd(), 'public', 'tlo.png');
  const bg = await loadImage(bgPath);
  ctx.drawImage(bg, 0, 0, 800, 150);

  ctx.fillStyle = '#7FFF00';
  ctx.font = 'bold 30px monospace';
  ctx.textAlign = 'center';
  ctx.shadowColor = '#7FFF00';
  ctx.shadowBlur = 12;

  // Pozycje wycentrowane pod okienka - lekko popraw jak trzeba
  ctx.fillText(String(online).padStart(3,'0'), 273, 120);
  ctx.fillText(String(dzis).padStart(3,'0'), 497, 120);
  ctx.fillText(String(ogolem).padStart(3,'0'), 760, 120);

  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.send(canvas.toBuffer('image/png'));
};
