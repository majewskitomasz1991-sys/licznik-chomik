
const { createCanvas, loadImage } = require('@napi-rs/canvas');
const path = require('path');
module.exports = async (req, res) => {
  const startDate = new Date('2025-01-01').getTime();
  const now = Date.now();
  const days = Math.floor((now - startDate) / 86400000);
  const ogolem = 1247 + days*23 + Math.floor(Math.random()*5);
  const dzis = 5 + Math.floor(Math.random()*12) + new Date().getHours();
  const online = Math.floor(Math.random()*3)+1;

  const canvas = createCanvas(800, 150);
  const ctx = canvas.getContext('2d');

  try {
    const bgPath = path.join(process.cwd(), 'public', 'tlo.png');
    const bg = await loadImage(bgPath);
    ctx.drawImage(bg, 0, 0, 800, 150);
  } catch(e) {}

  // POPRAWIONE POZYCJE - srodek ramek
  ctx.fillStyle = '#7FFF00';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // ONLINE - srodek ramki 309-401 , 492-552 => x=284 y=78
  ctx.font = 'bold 22px monospace';
  ctx.fillText(String(online).padStart(2,'0'), 284, 80);
  
  // DZIS - 496-581 , 504-556 => x=431 y=80
  ctx.font = 'bold 22px monospace';
  ctx.fillText(String(dzis).padStart(3,'0'), 431, 81);
  
  // OGOLEM - 700-798 , 504-557 => x=599 y=81
  ctx.font = 'bold 24px monospace';
  ctx.fillText(String(ogolem).padStart(4,'0'), 599, 81);

  const buffer = canvas.toBuffer('image/png');
  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('X-Accel-Expires', '0');
  res.send(buffer);
};
