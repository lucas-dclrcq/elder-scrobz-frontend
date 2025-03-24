export type TimeRange = 'today' | 'week' | 'month' | 'year' | 'all';

export interface Artist {
  id: string;
  name: string;
  imageUrl: string;
  playCount: number;
  duration: number; // in minutes
}

export interface ArtistDetails extends Artist {
  topTracks: Track[];
  albums: Album[];
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  playCount: number;
  duration: number; // in minutes
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  playCount: number;
  duration: number; // in minutes
}

export interface RecentTrack {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  lastPlayed: string;
  user: string;
}

export interface MusicStats {
  topArtists: Artist[];
  topTracks: Track[];
  topAlbums: Album[];
  recentTracks: RecentTrack[];
} 