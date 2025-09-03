const puppeteer = require('puppeteer');

async function debugGLightbox() {
  console.log('🔍 Debugging GLightbox implementation...');
  
  const browser = await puppeteer.launch({ 
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized'],
    devtools: true
  });
  
  const page = await browser.newPage();
  
  // Log all console messages from the page
  page.on('console', msg => {
    const type = msg.type();
    if (type === 'error') {
      console.log('❌ Browser Error:', msg.text());
    } else if (type === 'warn') {
      console.log('⚠️  Browser Warning:', msg.text());
    } else if (type === 'log') {
      console.log('🔍 Browser Log:', msg.text());
    }
  });
  
  try {
    console.log('📊 Navigating to media page...');
    await page.goto('http://localhost:4322/media', { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });
    
    console.log('✅ Page loaded successfully');
    
    // Check page basics
    const title = await page.title();
    console.log('📄 Page title:', title);
    
    // Check for GLightbox elements
    const glightboxElements = await page.$$('.glightbox');
    console.log('🎬 .glightbox elements found:', glightboxElements.length);
    
    // Check for GLightbox CSS
    const glightboxCSS = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('link'));
      return links.some(link => link.href && link.href.includes('glightbox'));
    });
    console.log('🎨 GLightbox CSS loaded:', glightboxCSS);
    
    // Check for GLightbox script/manager
    const glightboxJS = await page.evaluate(() => {
      return typeof window.glightboxManager !== 'undefined' || typeof window.GLightbox !== 'undefined';
    });
    console.log('⚙️  GLightbox JS initialized:', glightboxJS);
    
    // Check component structure
    const heroCarousel = await page.$('.hero-carousel');
    console.log('🎠 Hero carousel found:', !!heroCarousel);
    
    const videoGallery = await page.$$('.group');
    console.log('📼 Video gallery cards found:', videoGallery.length);
    
    const playButtons = await page.$$('.glightbox-play-btn');
    console.log('▶️  Play buttons found:', playButtons.length);
    
    const tooltips = await page.$$('.media-tooltip');
    console.log('💬 Tooltip elements found:', tooltips.length);
    
    // Get all imports/scripts on page
    const scripts = await page.evaluate(() => {
      const allScripts = Array.from(document.querySelectorAll('script'));
      return allScripts.map(s => s.src || 'inline').filter(src => src.includes('glightbox') || src.includes('GLightbox'));
    });
    console.log('📦 GLightbox scripts loaded:', scripts);
    
    // Check network requests
    const responses = await page.evaluate(() => {
      return performance.getEntriesByType('resource')
        .filter(entry => entry.name.includes('glightbox'))
        .map(entry => ({ url: entry.name, status: entry.transferSize > 0 ? 'loaded' : 'cached' }));
    });
    console.log('🌐 GLightbox network requests:', responses);
    
    console.log('\n🎯 Ready for manual testing...');
    console.log('👆 Browser window opened - you can now test GLightbox manually');
    console.log('📝 Check hover effects and click functionality');
    console.log('⏹️  Press Ctrl+C when done');
    
    // Keep browser open for manual testing
    await new Promise(() => {});
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Handle cleanup
process.on('SIGINT', () => {
  console.log('\n👋 Closing browser...');
  process.exit(0);
});

debugGLightbox();