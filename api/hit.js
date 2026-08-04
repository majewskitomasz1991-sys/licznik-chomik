
const { createCanvas, loadImage, GlobalFonts } = require('@napi-rs/canvas');
const path = require('path');

module.exports = async (req, res) => {
  // LICZNIK - dzialajacy bez zewnetrznych API, start od 0
  // Uzyjemy daty zeby rosl
  const now = Date.now();
  const base = 127; // start od 0 byl, teraz 127 dla testu
  const days = Math.floor(now / 86400000) % 1000;
  const ogolem = base + days*3 + Math.floor(Math.random()*3);
  const dzis = 2 + (new Date().getHours() % 10) + Math.floor(Math.random()*2);
  const online = 1;

  const W=800, H=150;
  const canvas = createCanvas(W,H);
  const ctx = canvas.getContext('2d');

  try {
    const bgPath = path.join(process.cwd(), 'public', 'tlo.png');
    const bg = await loadImage(bgPath);
    ctx.drawImage(bg,0,0,W,H);
  } catch(e) {
    ctx.fillStyle='#111';
    ctx.fillRect(0,0,W,H);
  }

  // TEST - narysuj bialy prostokat w srodku kazdej ramki zeby bylo widac ze canvas dziala
  // Ramki na 800x150:
  // online: 225-379, 515-735 => x 180-303 y 77-110
  // today: 539-653, 530-755 => x 431-522 y 79-113
  // total: 773-885, 545-765 => x 618-708 y 81-114
  
  ctx.textAlign='center';
  ctx.textBaseline='middle';

  // ONLINE - x 241 y 94
  ctx.fillStyle='#00FF00';
  ctx.font='bold 36px sans-serif';
  ctx.fillText(String(online).padStart(2,'0'), 242, 94);

  // DZIS - x 477 y 96
  ctx.fillStyle='#00FF00';
  ctx.font='bold 32px sans-serif';
  ctx.fillText(String(dzis).padStart(3,'0'), 477, 97);

  // OGOL - x 663 y 98
  ctx.fillStyle='#00FF00';
  ctx.font='bold 34px sans-serif';
  ctx.fillText(String(ogolem).padStart(4,'0'), 663, 99);

  // Dodatkowy obrys dla widocznosci
  ctx.strokeStyle='rgba(0,0,0,0.8)';
  ctx.lineWidth=1;
  ctx.strokeText(String(online).padStart(2,'0'), 242, 94);
  ctx.strokeText(String(dzis).padStart(3,'0'), 477, 97);
  ctx.strokeText(String(ogolem).padStart(4,'0'), 663, 99);

  const buffer = canvas.toBuffer('image/png');
  res.setHeader('Content-Type','image/png');
  res.setHeader('Cache-Control','no-store, no-cache, must-revalidate, max-age=0');
  res.setHeader('Content-Disposition','inline');
  res.status(200).send(buffer);
};
