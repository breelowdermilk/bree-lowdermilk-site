# URGENT: Fix GLightbox Inline Video Popups on Media Page

## Problem
The media page at http://localhost:4600/media is not showing inline video popups correctly. Videos are opening as direct YouTube links instead of using GLightbox for inline playback.

## Current State
- **Server**: Running on port 4600 at `/Users/breelowdermilk/Development/bree-lowdermilk-site/`
- **Branch**: `feat/glightbox-profiles`
- **Affected Files**:
  - `/site/src/pages/media.astro`
  - `/site/src/data/media/youtube-performances.js`
  - GLightbox components

## What Was Working Before
- GLightbox was successfully creating inline video popups for YouTube videos
- Clicking on a performer's image would open a modal with embedded YouTube video
- The inline functionality was working on the media page

## Current Issues
1. Videos with YouTube IDs are opening as external links instead of inline popups
2. GLightbox may not be properly initialized or configured for the media page
3. The `data-type="video"` attribute might not be set correctly

## Data File Status
The `/site/src/data/media/youtube-performances.js` file has:
- ✅ Correct Spotify album IDs (verified working):
  - The Mad Ones: `5FJwogR1gzKOzep43UO0LR`
  - Our First Mistake: `5ZtyksLeQ8cyrwF2JyD4VQ`
  - Kerrigan-Lowdermilk Live: `0BT5JPxScoRVNMlkDbMe4f`
- ✅ Some verified YouTube video IDs:
  - Aaron Tveit "Run Away With Me": `61EL69OZSlY`
  - Jeremy Jordan "Run Away With Me": `jVwtGU3KOro`
  - Lindsay Mendez "Hand in Hand": `Gt76Mf6yAEo`

## What Needs Fixing
1. **Restore GLightbox inline functionality** for YouTube videos
2. **Ensure proper GLightbox initialization** on the media page
3. **Verify the media.astro page** is correctly using GLightbox attributes:
   - `class="glightbox"`
   - `data-type="video"` for YouTube videos
   - `data-gallery="performances"`
4. **Check GLightboxInit component** is properly imported and configured

## Expected Behavior
- Clicking on a performer image with a valid `youtubeId` should:
  1. Open a GLightbox modal overlay
  2. Display the YouTube video inline
  3. Allow closing the modal to return to the gallery
- Entries without YouTube IDs can continue opening as external search links

## Files to Check
1. `/site/src/pages/media.astro` - Main media page
2. `/site/src/components/media/GLightboxInit.astro` - GLightbox initialization
3. `/site/src/data/media/youtube-performances.js` - Data file (already has correct IDs)
4. Any GLightbox configuration or profile settings

## Testing
After fixing, verify at http://localhost:4600/media:
- [ ] Aaron Tveit video opens inline
- [ ] Jeremy Jordan video opens inline
- [ ] Lindsay Mendez video opens inline
- [ ] Spotify album links work correctly
- [ ] Search links (no YouTube ID) open in new tab

## Additional Context
- There's also a `/site/src/pages/media2.astro` file that might have a working version
- The project recently added GLightbox profiles feature (`feat/glightbox-profiles` branch)
- Multiple servers may be running - ensure you're testing on port 4600

## Priority
**HIGH** - The inline video functionality is a core feature of the media page and needs to work for proper user experience.

---
Please fix the GLightbox inline video popup functionality while maintaining the corrected YouTube and Spotify IDs.