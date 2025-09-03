import puppeteer from 'puppeteer';

async function quickCheck() {
  console.log('🔄 Testing GLightbox on fresh server (port 4330)...');
  
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized']
  });
  
  const page = await browser.newPage();
  
  try {
    console.log('📊 Loading http://localhost:4330/media ...');
    await page.goto('http://localhost:4330/media', { waitUntil: 'networkidle0', timeout: 30000 });
    
    const title = await page.title();
    console.log('✅ Page loaded:', title);
    
    const glightboxElements = await page.$$('.glightbox');
    console.log('🎬 GLightbox elements:', glightboxElements.length);
    
    const tooltips = await page.$$('.media-tooltip');
    console.log('💬 Tooltips:', tooltips.length);
    
    console.log('');
    console.log('🎯 SUCCESS! GLightbox media page is ready at:');
    console.log('🌐 http://localhost:4330/media');
    console.log('');
    console.log('✨ Features to test:');
    console.log('   • Hover over video thumbnails → See tooltips');
    console.log('   • Click any video → Opens GLightbox modal');
    console.log('   • Press Escape → Closes modal');
    console.log('   • Arrow keys → Navigate between videos');
    console.log('');
    console.log('🖥️  Browser window will stay open for testing...');
    
    // Keep browser open for manual testing
    await new Promise(() => {});
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    await browser.close();
  }
}

process.on('SIGINT', () => {
  console.log('\n👋 Closing test...');
  process.exit(0);
});

quickCheck();