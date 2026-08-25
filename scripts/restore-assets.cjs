const fs = require('fs');
const path = require('path');

console.log('--- Restoring pristine binary images from JSON payloads ---');

const payloadsDir = path.join(__dirname, 'image-payloads');
if (!fs.existsSync(payloadsDir)) {
  console.log('No image-payloads directory found.');
  process.exit(0);
}

const payloadFiles = fs.readdirSync(payloadsDir).filter(f => f.endsWith('.json'));
let restoredCount = 0;

payloadFiles.forEach(pf => {
  const jsonPath = path.join(payloadsDir, pf);
  try {
    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    for (const [relPath, base64Str] of Object.entries(data)) {
      const buf = Buffer.from(base64Str, 'base64');
      
      // Write to public/
      const publicDest = path.join(process.cwd(), 'public', relPath);
      fs.mkdirSync(path.dirname(publicDest), { recursive: true });
      fs.writeFileSync(publicDest, buf);

      // Write to dist/ if dist exists or during build
      const distDest = path.join(process.cwd(), 'dist', relPath);
      fs.mkdirSync(path.dirname(distDest), { recursive: true });
      fs.writeFileSync(distDest, buf);

      restoredCount++;
    }
  } catch (err) {
    console.error('Error processing payload:', pf, err.message);
  }
});

console.log(`Successfully restored ${restoredCount} binary assets directly to public/ and dist/.`);
