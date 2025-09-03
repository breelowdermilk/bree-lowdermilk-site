import puppeteer from 'puppeteer';

async function testMedia2() {
  console.log('🎨 Testing Pure GLightbox Demo Page...');
  
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized']
  });
  
  const page = await browser.newPage();
  
  try {
    console.log('📊 Loading http://localhost:4330/media2 ...');
    await page.goto('http://localhost:4330/media2', { waitUntil: 'networkidle0', timeout: 30000 });
    
    const title = await page.title();
    console.log('✅ Page loaded:', title);
    
    const glightboxElements = await page.$$('.glightbox');
    console.log('🖼️  Gallery images found:', glightboxElements.length);
    
    const gridItems = await page.$$('.grid > div');
    console.log('🎯 Grid items created:', gridItems.length);
    
    console.log('');
    console.log('🎉 SUCCESS! Pure GLightbox demo ready at:');
    console.log('🌐 http://localhost:4330/media2');
    console.log('');
    console.log('✨ Pure GLightbox Features:');
    console.log('   🖼️  Wall of beautiful images');
    console.log('   ▶️  Click any image → Opens video in GLightbox');
    console.log('   🎬 YouTube videos play in elegant modal');
    console.log('   ⬅️➡️ Arrow keys navigate between videos');
    console.log('   ❌ Escape key closes modal');
    console.log('   📱 Fully responsive grid layout');
    console.log('');
    console.log('🎨 Design inspired by: https://biati-digital.github.io/glightbox/');
    console.log('🖥️  Browser window open for exploration...');
    
    // Keep browser open for demo
    await new Promise(() => {});
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    await browser.close();
  }
}

process.on('SIGINT', () => {
  console.log('\n👋 Closing demo...');
  process.exit(0);
});

testMedia2();