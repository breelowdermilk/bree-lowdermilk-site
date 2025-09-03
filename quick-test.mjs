import puppeteer from 'puppeteer';

async function quickTest() {
  console.log('🔍 Testing GLightbox after dependency fix...');
  
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  
  try {
    await page.goto('http://localhost:4322/media', { waitUntil: 'networkidle0', timeout: 30000 });
    
    const glightboxElements = await page.$$('.glightbox');
    console.log('✅ GLightbox elements found:', glightboxElements.length);
    
    const tooltips = await page.$$('.media-tooltip');
    console.log('💬 Tooltip elements found:', tooltips.length);
    
    const glightboxCSS = await page.evaluate(() => {
      return !!document.querySelector('link[href*="glightbox"]');
    });
    console.log('🎨 GLightbox CSS loaded:', glightboxCSS);
    
    const playButtons = await page.$$('.glightbox-play-btn');
    console.log('▶️  Play button elements found:', playButtons.length);
    
    // Test clicking a GLightbox element
    if (glightboxElements.length > 0) {
      console.log('🎬 Testing GLightbox modal...');
      await glightboxElements[0].click();
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const modal = await page.$('.glightbox-container');
      console.log('🎥 GLightbox modal opened:', !!modal);
      
      if (modal) {
        await page.keyboard.press('Escape');
        console.log('✅ Modal closed with Escape key');
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
}

quickTest();