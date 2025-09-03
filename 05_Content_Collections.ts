import { defineCollection, z } from "astro:content";

const songs = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    show: z.string().optional(),
    voiceTypes: z.array(z.enum([
      "Soprano","Mezzo","Alto","Tenor","Baritone","Bass","Duet","Trio","Quartet","Ensemble","Mixed"
    ])).default([]),
    keys: z.array(z.object({
      name: z.string(),           // e.g. "F Major"
      range: z.string().optional(), // e.g. "A3–C5"
      isOriginal: z.boolean().optional()
    })).default([]),
    moods: z.array(z.string()).default([]),
    tempoBpm: z.number().optional(),
    lyricExcerpt: z.string().optional(),
    lyrics: z.string().optional(),
    sheetMusic: z.object({
      provider: z.string().optional(),
      url: z.string().url().optional()
    }).optional(),
    media: z.object({
      youtubeId: z.string().optional(),
      spotifyUrl: z.string().optional(),
      appleUrl: z.string().optional(),
      soundcloudUrl: z.string().optional()
    }).optional(),
    credits: z.array(z.string()).default([]),
    coverImage: z.string().optional(),
    date: z.string().optional(),
    published: z.boolean().default(true)
  })
});

const shows = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    status: z.enum(["development","licensed","archived","touring"]).default("development"),
    synopsis: z.string().optional(),
    credits: z.array(z.string()).default([]),
    heroImage: z.string().optional(),
    gallery: z.array(z.string()).default([]),
    links: z.object({
      licensing: z.string().url().optional()
    }).optional(),
    pressQuotes: z.array(z.object({
      quote: z.string(),
      outlet: z.string(),
      author: z.string().optional(),
      date: z.string().optional(),
      url: z.string().url().optional()
    })).default([])
  })
});

const recordings = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    releaseDate: z.string().optional(),
    coverImage: z.string().optional(),
    tracks: z.array(z.object({
      title: z.string(),
      songSlug: z.string().optional(),
      duration: z.string().optional()
    })).default([]),
    streamLinks: z.object({
      spotify: z.string().optional(),
      apple: z.string().optional(),
      bandcamp: z.string().optional()
    }).optional(),
    credits: z.array(z.string()).default([])
  })
});

const events = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    startDateTime: z.string(), // ISO
    endDateTime: z.string().optional(),
    venue: z.object({
      name: z.string(),
      address: z.string().optional(),
      city: z.string().optional(),
      url: z.string().optional()
    }),
    ticketsUrl: z.string().optional(),
    status: z.enum(["scheduled","postponed","cancelled","completed"]).default("scheduled"),
    notes: z.string().optional(),
    relatedWorks: z.array(z.string()).default([])
  })
});

const press = defineCollection({
  type: "content",
  schema: z.object({
    quote: z.string(),
    outlet: z.string(),
    author: z.string().optional(),
    date: z.string().optional(),
    url: z.string().url().optional()
  })
});

export const collections = { songs, shows, recordings, events, press };
