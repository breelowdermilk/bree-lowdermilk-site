const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Show image URLs from Kerrigan-Lowdermilk website
const images = [
  {
    name: 'The Mad Ones',
    url: 'https://kerrigan-lowdermilk.com/upload/images/albums/20180914-7369844b589297f71ea7a3d5f939f3c2_36ffbcf7-4a3c-4ef9-915d-1fddf9639b6f_1024x1024.jpg',
    filename: '20180914-7369844b589297f71ea7a3d5f939f3c2_36ffbcf7-4a3c-4ef9-915d-1fddf9639b6f_1024x1024.jpg'
  },
  {
    name: 'Henry and Mudge',
    url: 'https://kerrigan-lowdermilk.com/upload/images/albums/20130904-Henry-And-Mudge.jpg',
    filename: '20130904-Henry-And-Mudge.jpg'
  }
];

// Additional URLs to try
const additionalImages = [
  'https://kerrigan-lowdermilk.com/upload/images/albums/20130904-Republic.jpg',
  'https://kerrigan-lowdermilk.com/upload/images/albums/20130904-Woman-Upstairs.jpg',
  'https://kerrigan-lowdermilk.com/upload/images/albums/20130904-Bad-Years.jpg',
  'https://kerrigan-lowdermilk.com/upload/images/albums/20130904-FreshX.jpg',
  'https://kerrigan-lowdermilk.com/upload/images/albums/20151031-nakedradiologo-small.jpg',
  'https://kerrigan-lowdermilk.com/upload/images/albums/20130624-Party-Worth-Crashing.png'
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

async function downloadAllImages() {
  const uploadDir = '/Users/breelowdermilk/Development/bree-lowdermilk-site/site/public/upload/images/albums';
  
  // Ensure directory exists
  fs.mkdirSync(uploadDir, { recursive: true });
  
  console.log('Downloading show images...\n');
  
  // Download main show images
  for (const image of images) {
    const filepath = path.join(uploadDir, image.filename);
    try {
      await downloadImage(image.url, filepath);
    } catch (error) {
      console.log(`❌ Failed to download ${image.name}`);
    }
  }
  
  // Try additional URLs
  for (const url of additionalImages) {
    const filename = path.basename(url);
    const filepath = path.join(uploadDir, filename);
    try {
      await downloadImage(url, filepath);
    } catch (error) {
      // Silently continue for these attempts
    }
  }
  
  console.log('\n✅ Image download complete!');
}

downloadAllImages().catch(console.error);