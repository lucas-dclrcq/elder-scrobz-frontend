import { MusicStats, TimeRange, RecentTrack, ArtistDetails } from '@/types/music';

const mockArtists = [
  { id: '1', name: 'The Beatles', imageUrl: 'https://picsum.photos/200/200?random=1', playCount: 150, duration: 300 },
  { id: '2', name: 'Pink Floyd', imageUrl: 'https://picsum.photos/200/200?random=2', playCount: 120, duration: 270 },
  { id: '3', name: 'Led Zeppelin', imageUrl: 'https://picsum.photos/200/200?random=3', playCount: 100, duration: 300 },
  { id: '4', name: 'David Bowie', imageUrl: 'https://picsum.photos/200/200?random=4', playCount: 90, duration: 240 },
  { id: '5', name: 'Queen', imageUrl: 'https://picsum.photos/200/200?random=5', playCount: 85, duration: 450 },
  { id: '6', name: 'The Rolling Stones', imageUrl: 'https://picsum.photos/200/200?random=6', playCount: 80, duration: 270 },
  { id: '7', name: 'Nirvana', imageUrl: 'https://picsum.photos/200/200?random=7', playCount: 75, duration: 300 },
  { id: '8', name: 'Radiohead', imageUrl: 'https://picsum.photos/200/200?random=8', playCount: 70, duration: 270 },
  { id: '9', name: 'Arctic Monkeys', imageUrl: 'https://picsum.photos/200/200?random=9', playCount: 65, duration: 300 },
  { id: '10', name: 'Tame Impala', imageUrl: 'https://picsum.photos/200/200?random=10', playCount: 60, duration: 270 },
];

const mockTracks = [
  { id: '1', title: 'Bohemian Rhapsody', artist: 'Queen', imageUrl: 'https://picsum.photos/200/200?random=6', playCount: 50, duration: 5.5 },
  { id: '2', title: 'We Will Rock You', artist: 'Queen', imageUrl: 'https://picsum.photos/200/200?random=7', playCount: 45, duration: 2.0 },
  { id: '3', title: 'Don\'t Stop Me Now', artist: 'Queen', imageUrl: 'https://picsum.photos/200/200?random=8', playCount: 40, duration: 3.3 },
  { id: '4', title: 'Radio Ga Ga', artist: 'Queen', imageUrl: 'https://picsum.photos/200/200?random=9', playCount: 35, duration: 5.5 },
  { id: '5', title: 'Somebody to Love', artist: 'Queen', imageUrl: 'https://picsum.photos/200/200?random=10', playCount: 30, duration: 4.6 },
  { id: '6', title: 'Crazy Little Thing Called Love', artist: 'Queen', imageUrl: 'https://picsum.photos/200/200?random=11', playCount: 25, duration: 2.4 },
  { id: '7', title: 'We Are the Champions', artist: 'Queen', imageUrl: 'https://picsum.photos/200/200?random=12', playCount: 20, duration: 3.0 },
  { id: '8', title: 'Killer Queen', artist: 'Queen', imageUrl: 'https://picsum.photos/200/200?random=13', playCount: 18, duration: 3.0 },
  { id: '9', title: 'Bicycle Race', artist: 'Queen', imageUrl: 'https://picsum.photos/200/200?random=14', playCount: 15, duration: 3.0 },
  { id: '10', title: 'Fat Bottomed Girls', artist: 'Queen', imageUrl: 'https://picsum.photos/200/200?random=15', playCount: 12, duration: 4.2 },
  { id: '11', title: 'Stairway to Heaven', artist: 'Led Zeppelin', imageUrl: 'https://picsum.photos/200/200?random=16', playCount: 45, duration: 8.0 },
  { id: '12', title: 'Black Dog', artist: 'Led Zeppelin', imageUrl: 'https://picsum.photos/200/200?random=17', playCount: 40, duration: 4.6 },
  { id: '13', title: 'Rock and Roll', artist: 'Led Zeppelin', imageUrl: 'https://picsum.photos/200/200?random=18', playCount: 35, duration: 3.4 },
  { id: '14', title: 'Whole Lotta Love', artist: 'Led Zeppelin', imageUrl: 'https://picsum.photos/200/200?random=19', playCount: 30, duration: 5.4 },
  { id: '15', title: 'Immigrant Song', artist: 'Led Zeppelin', imageUrl: 'https://picsum.photos/200/200?random=20', playCount: 25, duration: 2.3 },
  { id: '16', title: 'Kashmir', artist: 'Led Zeppelin', imageUrl: 'https://picsum.photos/200/200?random=21', playCount: 20, duration: 8.3 },
  { id: '17', title: 'Ramble On', artist: 'Led Zeppelin', imageUrl: 'https://picsum.photos/200/200?random=22', playCount: 18, duration: 4.3 },
  { id: '18', title: 'Heartbreaker', artist: 'Led Zeppelin', imageUrl: 'https://picsum.photos/200/200?random=23', playCount: 15, duration: 4.1 },
  { id: '19', title: 'Good Times Bad Times', artist: 'Led Zeppelin', imageUrl: 'https://picsum.photos/200/200?random=24', playCount: 12, duration: 2.4 },
  { id: '20', title: 'Dazed and Confused', artist: 'Led Zeppelin', imageUrl: 'https://picsum.photos/200/200?random=25', playCount: 10, duration: 6.2 }
];

const mockAlbums = [
  { id: '1', title: 'The Beatles', artist: 'The Beatles', imageUrl: 'https://picsum.photos/200/200?random=21', playCount: 80, duration: 47.2 },
  { id: '2', title: 'The Wall', artist: 'Pink Floyd', imageUrl: 'https://picsum.photos/200/200?random=22', playCount: 70, duration: 42.9 },
  { id: '3', title: 'Led Zeppelin IV', artist: 'Led Zeppelin', imageUrl: 'https://picsum.photos/200/200?random=23', playCount: 60, duration: 42.3 },
  { id: '4', title: 'David Bowie', artist: 'David Bowie', imageUrl: 'https://picsum.photos/200/200?random=24', playCount: 50, duration: 38.2 },
  { id: '5', title: 'A Night at the Opera', artist: 'Queen', imageUrl: 'https://picsum.photos/200/200?random=25', playCount: 45, duration: 43.0 },
  { id: '6', title: 'Aftermath', artist: 'The Rolling Stones', imageUrl: 'https://picsum.photos/200/200?random=26', playCount: 40, duration: 42.9 },
  { id: '7', title: 'Nevermind', artist: 'Nirvana', imageUrl: 'https://picsum.photos/200/200?random=27', playCount: 35, duration: 42.3 },
  { id: '8', title: 'Pablo Honey', artist: 'Radiohead', imageUrl: 'https://picsum.photos/200/200?random=28', playCount: 30, duration: 42.9 },
  { id: '9', title: 'AM', artist: 'Arctic Monkeys', imageUrl: 'https://picsum.photos/200/200?random=29', playCount: 25, duration: 47.2 },
  { id: '10', title: 'Currents', artist: 'Tame Impala', imageUrl: 'https://picsum.photos/200/200?random=30', playCount: 20, duration: 42.9 },
];

const recentTracks: RecentTrack[] = [
  {
    id: '1',
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    imageUrl: 'https://picsum.photos/200/200?random=1',
    lastPlayed: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    user: 'john_doe'
  },
  {
    id: '2',
    title: 'Stairway to Heaven',
    artist: 'Led Zeppelin',
    imageUrl: 'https://picsum.photos/200/200?random=2',
    lastPlayed: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
    user: 'jane_smith'
  },
  {
    id: '3',
    title: 'Hotel California',
    artist: 'Eagles',
    imageUrl: 'https://picsum.photos/200/200?random=3',
    lastPlayed: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
    user: 'john_doe'
  },
  {
    id: '4',
    title: 'Sweet Caroline',
    artist: 'Neil Diamond',
    imageUrl: 'https://picsum.photos/200/200?random=4',
    lastPlayed: new Date(Date.now() - 1000 * 60 * 180).toISOString(), // 3 hours ago
    user: 'jane_smith'
  },
  {
    id: '5',
    title: 'Piano Man',
    artist: 'Billy Joel',
    imageUrl: 'https://picsum.photos/200/200?random=5',
    lastPlayed: new Date(Date.now() - 1000 * 60 * 240).toISOString(), // 4 hours ago
    user: 'john_doe'
  }
]

// Generate 95 more recent tracks with random data
const generateMoreTracks = (): RecentTrack[] => {
  const tracks: RecentTrack[] = []
  const users = ['john_doe', 'jane_smith', 'bob_wilson', 'alice_brown', 'charlie_davis']
  const artists = [
    'The Beatles', 'Pink Floyd', 'David Bowie', 'The Rolling Stones', 'Fleetwood Mac',
    'The Doors', 'Jimi Hendrix', 'Bob Dylan', 'The Who', 'Creedence Clearwater Revival'
  ]
  const titles = [
    'Hey Jude', 'Comfortably Numb', 'Space Oddity', 'Paint It Black', 'Go Your Own Way',
    'Light My Fire', 'Purple Haze', 'Like a Rolling Stone', 'My Generation', 'Fortunate Son'
  ]

  for (let i = 6; i <= 100; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)]
    const randomArtist = artists[Math.floor(Math.random() * artists.length)]
    const randomTitle = titles[Math.floor(Math.random() * titles.length)]
    const hoursAgo = Math.floor(Math.random() * 72) // Random time up to 3 days ago

    tracks.push({
      id: i.toString(),
      title: randomTitle,
      artist: randomArtist,
      imageUrl: `https://picsum.photos/200/200?random=${i}`,
      lastPlayed: new Date(Date.now() - 1000 * 60 * 60 * hoursAgo).toISOString(),
      user: randomUser
    })
  }

  return tracks
}

export const fetchMusicStats = async (timeRange: TimeRange): Promise<MusicStats> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))

  const allRecentTracks = [...recentTracks, ...generateMoreTracks()]
  
  // Sort tracks by lastPlayed in descending order (newest first)
  const sortedRecentTracks = allRecentTracks.sort((a, b) => 
    new Date(b.lastPlayed).getTime() - new Date(a.lastPlayed).getTime()
  )

  return {
    topArtists: mockArtists,
    topTracks: mockTracks,
    topAlbums: mockAlbums,
    recentTracks: sortedRecentTracks
  }
}

export const fetchArtistDetails = async (artistId: string): Promise<ArtistDetails> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))

  // Find the artist in mock data
  const artist = mockArtists.find(a => a.id === artistId)
  if (!artist) {
    throw new Error('Artist not found')
  }

  // Get top tracks for this artist
  const artistTracks = mockTracks
    .filter(t => t.artist === artist.name)
    .sort((a, b) => b.playCount - a.playCount)
    .slice(0, 10)

  // Get albums for this artist
  const artistAlbums = mockAlbums
    .filter(a => a.artist === artist.name)
    .sort((a, b) => b.playCount - a.playCount)

  return {
    ...artist,
    topTracks: artistTracks,
    albums: artistAlbums
  }
} 