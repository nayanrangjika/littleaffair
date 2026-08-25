const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');

function getAllImageFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllImageFiles(fullPath));
    } else {
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
        results.push(fullPath);
      }
    }
  });
  return results;
}

async function optimizeImage(filePath) {
  try {
    const statBefore = fs.statSync(filePath).size;
    if (statBefore < 100) return { before: statBefore, after: statBefore };
    
    const ext = path.extname(filePath).toLowerCase();

    let imagePipeline = sharp(filePath).resize(1400, 1400, {
      fit: 'inside',
      withoutEnlargement: true
    });

    let buffer;
    if (ext === '.jpg' || ext === '.jpeg') {
      buffer = await imagePipeline.jpeg({ quality: 80, mozjpeg: true }).toBuffer();
    } else if (ext === '.png') {
      buffer = await imagePipeline.png({ quality: 75, compressionLevel: 9, palette: true }).toBuffer();
    } else if (ext === '.webp') {
      buffer = await imagePipeline.webp({ quality: 80 }).toBuffer();
    }

    if (buffer && buffer.length < statBefore) {
      fs.writeFileSync(filePath, buffer);
      return { before: statBefore, after: buffer.length };
    }
    return { before: statBefore, after: statBefore };
  } catch (err) {
    const sz = fs.existsSync(filePath) ? fs.statSync(filePath).size : 0;
    return { before: sz, after: sz };
  }
}

async function main() {
  console.log('Gathering images in public directory...');
  const files = getAllImageFiles(PUBLIC_DIR);
  console.log(`Found ${files.length} images to optimize.`);

  let totalBefore = 0;
  let totalAfter = 0;
  const chunkSize = 15;

  for (let i = 0; i < files.length; i += chunkSize) {
    const chunk = files.slice(i, i + chunkSize);
    const results = await Promise.all(chunk.map(f => optimizeImage(f)));
    for (const res of results) {
      totalBefore += res.before;
      totalAfter += res.after;
    }
    console.log(`Processed ${Math.min(i + chunkSize, files.length)} / ${files.length} images...`);
  }

  const overallSavedMb = ((totalBefore - totalAfter) / 1024 / 1024).toFixed(2);
  const overallSavedPercent = ((1 - totalAfter / totalBefore) * 100).toFixed(1);
  console.log('\n==========================================');
  console.log(`Optimization Complete!`);
  console.log(`Original Total Size: ${(totalBefore / 1024 / 1024).toFixed(2)} MB`);
  console.log(`New Total Size:      ${(totalAfter / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Saved:               ${overallSavedMb} MB (${overallSavedPercent}% reduction)`);
  console.log('==========================================\n');
}

main();
