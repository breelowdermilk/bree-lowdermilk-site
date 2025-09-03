export type Album = {
  title: string;
  artist: string;
  spotifyId: string;
  releaseYear: string;
  description: string;
  coverUrl?: string;
  streamingLinks?: {
    spotify?: string;
    apple?: string;
    soundcloud?: string;
    youtube?: string;
  };
};

// Top 3 featured albums for Spotify embeds
const albums: Album[] = [
  {
    title: 'The Mad Ones',
    artist: 'Kerrigan-Lowdermilk',
    spotifyId: '4LGQpoVdCRNKKm5xJVajdz', // Placeholder - replace with actual Spotify album ID
    releaseYear: '2017',
    description: 'Original off-Broadway cast recording featuring the beloved songs from the musical',
    streamingLinks: {
      spotify: 'https://open.spotify.com/album/4LGQpoVdCRNKKm5xJVajdz',
      apple: 'https://music.apple.com/us/album/the-mad-ones-original-off-broadway-cast-recording/1234567890',
      youtube: 'https://www.youtube.com/playlist?list=PLexample'
    }
  },
  {
    title: 'Our First Mistake',
    artist: 'Kerrigan-Lowdermilk',
    spotifyId: '1A2B3C4D5E6F7G8H9I0J1K', // Placeholder - replace with actual Spotify album ID
    releaseYear: '2012',
    description: 'Debut album that reached #1 on the Singer/Songwriter chart',
    streamingLinks: {
      spotify: 'https://open.spotify.com/album/1A2B3C4D5E6F7G8H9I0J1K',
      apple: 'https://music.apple.com/us/album/our-first-mistake/1234567891'
    }
  },
  {
    title: 'Kerrigan-Lowdermilk Live',
    artist: 'Kerrigan-Lowdermilk',
    spotifyId: '9Z8Y7X6W5V4U3T2S1R0Q9P', // Placeholder - replace with actual Spotify album ID
    releaseYear: '2018',
    description: 'Live recordings capturing the energy of their acclaimed concert performances',
    streamingLinks: {
      spotify: 'https://open.spotify.com/album/9Z8Y7X6W5V4U3T2S1R0Q9P',
      apple: 'https://music.apple.com/us/album/kerrigan-lowdermilk-live/1234567892',
      soundcloud: 'https://soundcloud.com/kerriganlowdermilk/sets/live'
    }
  }
];

export default albums;