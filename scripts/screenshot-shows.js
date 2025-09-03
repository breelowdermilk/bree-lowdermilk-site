const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function takeScreenshot() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Set viewport size
    await page.setViewport({ 
      width: 1200, 
      height: 800 
    });
    
    console.log('Navigating to shows page...');
    
    // Wait for the page to load - try both URL formats
    try {
      await page.goto('http://localhost:4322/shows', { 
        waitUntil: 'networkidle2',
        timeout: 15000 
      });
    } catch (error) {
      console.log('Trying alternative URL format...');
      await page.goto('http://localhost:4322/shows/', { 
        waitUntil: 'networkidle2',
        timeout: 15000 
      });
    }
    
    // Wait for content to render - try multiple selectors
    console.log('Waiting for content...');
    try {
      await page.waitForSelector('article', { timeout: 5000 });
    } catch {
      try {
        await page.waitForSelector('h1', { timeout: 5000 });
      } catch {
        console.log('Content selectors not found, proceeding with screenshot...');
      }
    }
    
    // Wait a bit for layout to stabilize
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Take screenshot
    const screenshotPath = '/Users/breelowdermilk/Development/bree-lowdermilk-site/shows-page-screenshot.png';
    console.log('Taking screenshot...');
    await page.screenshot({ 
      path: screenshotPath,
      fullPage: true 
    });
    
    console.log(`Screenshot saved to: ${screenshotPath}`);
    return screenshotPath;
    
  } catch (error) {
    console.error('Error taking screenshot:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

takeScreenshot()
  .then(path => {
    console.log('✅ Screenshot complete:', path);
  })
  .catch(error => {
    console.error('❌ Screenshot failed:', error);
    process.exit(1);
  });