import puppeteer from 'puppeteer';

async function quickTest() {
  console.log('🔍 Quick GLightbox check...');
  
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  
  try {
    console.log('📊 Loading media page...');
    await page.goto('http://localhost:4322/media', { waitUntil: 'networkidle0' });
    
    const title = await page.title();
    console.log('📄 Page title:', title);
    
    const glightboxElements = await page.$$('.glightbox');
    console.log('🎬 GLightbox elements found:', glightboxElements.length);
    
    const glightboxCSS = await page.evaluate(() => {
      return !!document.querySelector('link[href*="glightbox"]');
    });
    console.log('🎨 GLightbox CSS loaded:', glightboxCSS);
    
    const tooltips = await page.$$('.media-tooltip');
    console.log('💬 Tooltip elements found:', tooltips.length);
    
    const heroCarousel = await page.$('.hero-carousel');
    console.log('🎠 Hero carousel found:', !!heroCarousel);
    
    // Check what components are actually being used
    const imports = await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll('script'));
      return scripts.some(script => script.textContent && script.textContent.includes('GLightbox'));
    });
    console.log('📦 GLightbox imports detected:', imports);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
}

quickTest();