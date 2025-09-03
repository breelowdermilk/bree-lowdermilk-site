export default function eventJsonLd({ title, slug, startDateTime, endDateTime, venue, ticketsUrl }) {
  const url = `https://www.example.com/events/${slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "MusicEvent",
    "name": title,
    "startDate": startDateTime,
    "endDate": endDateTime,
    "eventStatus": "https://schema.org/EventScheduled",
    "url": url,
    "location": {
      "@type": "Place",
      "name": venue?.name,
      "address": venue?.address
    },
    "offers": ticketsUrl ? {
      "@type": "Offer",
      "url": ticketsUrl,
      "availability": "https://schema.org/InStock"
    } : undefined
  };
}
