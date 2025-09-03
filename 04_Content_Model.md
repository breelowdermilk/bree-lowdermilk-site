# Content Model (Human Readable)
## Entities
- **Song**
  - title, slug, show, voiceTypes[], keys[], moods[], tempoBpm?, lyricExcerpt?, lyrics?, media{youtubeId, spotifyUrl, appleUrl, soundcloudUrl}, sheetMusic{provider?, url?}, credits[], coverImage?, date?, published
- **Show**
  - title, slug, status, synopsis, credits[], heroImage?, gallery[], links{licensing?}, pressQuotes[]
- **Recording (Album/EP/Single)**
  - title, slug, releaseDate, coverImage, tracks[], streamLinks{spotify, apple, bandcamp}, credits[]
- **Event**
  - title, slug, startDateTime, endDateTime?, venue{name, address, city, url}, ticketsUrl?, status, notes, relatedWorks[]
- **PressQuote**
  - quote, outlet, author?, date?, url
