export default function songJsonLd({ title, slug, show, media, credits }) {
  const url = `https://www.example.com/songs/${slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "MusicComposition",
    "name": title,
    "url": url,
    "composer": [{ "@type": "Person", "name": "Bree Lowdermilk" }],
    "lyricist": credits?.find(c => c.toLowerCase().includes("lyrics by")) ? { "@type": "Person", "name": "Kait Kerrigan" } : undefined,
    "isPartOf": show ? { "@type": "CreativeWork", "name": show } : undefined,
    "audio": media?.spotifyUrl ? { "@type": "AudioObject", "url": media.spotifyUrl } : undefined
  };
}
