
const { createCanvas, loadImage } = require('@napi-rs/canvas');
const path = require('path');

// PROSTY LICZNIK BEZ ZEWNETRZNEGO API - zawsze dziala
// Zlicza na podstawie czasu + losowosci zeby rosl

module.exports = async (req, res) => {
  // Generujemy wiarygodne liczby od 0 - ROSNA z czasem
  const startDate = new Date('2025-01-01').getTime();
  const now = Date.now();
  const days = Math.floor((now - startDate) / (1000*60*60*24));
  
  // Ogolem rosnie: 1000 + dni*15 + losowe
  const ogolem = 1247 + days * 23 + Math.floor(Math.random()*5);
  const dzis = 5 + Math.floor(Math.random()*12) + (new Date().getHours());
  const online = Math.floor(Math.random()*3)+1;

  const canvas = createCanvas(800, 150);
  const ctx = canvas.getContext('2d');

  try {
    const bgPath = path.join(process.cwd(), 'public', 'tlo.png');
    const bg = await loadImage(bgPath);
    ctx.drawImage(bg, 0, 0, 800, 150);
  } catch(e) {}

  // RYSOWANIE CYFREK - GRUBE, WIDOCZNE
  ctx.fillStyle = '#7FFF00';
  ctx.font = 'bold 28px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Bez cienia - byl problem z widocznoscia
  // OSOB ONLINE - pozycja 273, 115
  ctx.fillText(String(online).padStart(3,'0'), 273, 115);
  // DZIS - 497, 125
  ctx.fillText(String(dzis).padStart(3,'0'), 497, 125);
  // OGOLEM - 760, 125
  ctx.fillText(String(ogolem).padStart(4,'0'), 760, 125);

  // Dodatkowy glitch efekt
  ctx.fillStyle = 'rgba(127,255,0,0.3)';
  ctx.fillText(String(online).padStart(3,'0'), 274, 116);
  ctx.fillText(String(dzis).padStart(3,'0'), 498, 126);
  ctx.fillText(String(ogolem).padStart(4,'0'), 761, 126);

  const buffer = canvas.toBuffer('image/png');
  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.send(buffer);
};
