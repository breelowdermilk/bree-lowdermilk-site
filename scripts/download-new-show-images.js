const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// New show images found
const newImages = [
  {
    name: 'Ada Twist Scientist & Friends',
    url: 'https://twusa.org/wp-content/uploads/2023/09/ADA_TWIST-scaled.jpg',
    filename: 'ada-twist-scientist.jpg'
  }
];

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    const request = protocol.get(url, (response) => {
      if (response.statusCode === 200) {
        const file = fs.createWriteStream(filepath);
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`✅ Downloaded: ${path.basename(filepath)}`);
          resolve(filepath);
        });
      } else if (response.statusCode === 302 || response.statusCode === 301) {
        // Handle redirects
        downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
      } else {
        console.log(`❌ Failed to download ${url}: ${response.statusCode}`);
        reject(new Error(`HTTP ${response.statusCode}`));
      }
    });
    
    request.on('error', (error) => {
      console.log(`❌ Error downloading ${url}:`, error.message);
      reject(error);
    });
  });
}

async function downloadNewImages() {
  const showsDir = '/Users/breelowdermilk/Development/bree-lowdermilk-site/site/public/images/shows';
  
  // Ensure directory exists
  fs.mkdirSync(showsDir, { recursive: true });
  
  console.log('Downloading new show images...\n');
  
  for (const image of newImages) {
    const filepath = path.join(showsDir, image.filename);
    try {
      await downloadImage(image.url, filepath);
    } catch (error) {
      console.log(`❌ Failed to download ${image.name}`);
    }
  }
  
  console.log('\n✅ New image download complete!');
}

downloadNewImages().catch(console.error);