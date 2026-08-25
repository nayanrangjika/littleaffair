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
      // Only target PNGs now to finish the job
      if (['.png'].includes(ext)) {
        results.push(fullPath);
      }
    }
  });
  return results;
}

async function convertAndOptimize(filePath) {
  try {
    const dir = path.dirname(filePath);
    const base = path.basename(filePath, path.extname(filePath));
    const newPath = path.join(dir, `${base}.jpg`);

    console.log(`Converting ${filePath} to ${newPath}`);
    
    // Resize slightly if it's huge, otherwise just convert
    await sharp(filePath)
      .resize(1280, 1280, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(newPath);

    fs.unlinkSync(filePath);
    return true;
  } catch (err) {
    console.error(`Error processing ${filePath}:`, err.message);
    return false;
  }
}

async function main() {
  const files = getAllImageFiles(PUBLIC_DIR);
  console.log(`Processing ${files.length} PNG images...`);
  
  for (const f of files) {
    await convertAndOptimize(f);
  }
  console.log('Done.');
}

main();
