# Embeds (Snippets)
## YouTube (Astro component)
```astro
---
// src/components/YouTube.astro
export interface Props { id: string; title?: string; }
const { id, title = "YouTube video" } = Astro.props;
---
<div class="video-outer">
  <iframe
    src={`https://www.youtube.com/embed/${id}`}
    title={title}
    loading="lazy"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
  ></iframe>
</div>
<style>
.video-outer{position:relative;aspect-ratio:16/9;width:100%}
.video-outer iframe{position:absolute;inset:0;border:0;width:100%;height:100%}
</style>
```

## Spotify
```astro
---
// src/components/SpotifyEmbed.astro
export interface Props { url: string }
const { url } = Astro.props;
---
<iframe
  src={url.replace("open.spotify.com", "open.spotify.com/embed")}
  loading="lazy"
  style="border:0; width:100%; height:152px;"
  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
/>
```

## Bandsintown Widget (paste into /events)
```html
<div class="bit-widget-initializer" data-artist-name="Bree Lowdermilk"></div>
<script src="https://widget.bandsintown.com/main.min.js"></script>
```
