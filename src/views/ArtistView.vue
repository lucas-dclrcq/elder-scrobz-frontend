<template>
  <div class="artist-page">
    <button class="back-button" @click="router.back()">
      <span class="back-icon">←</span>
      Back
    </button>
    <div class="artist-header">
      <img :src="artist.imageUrl" :alt="artist.name" class="artist-image" />
      <div class="artist-info">
        <h1>{{ artist.name }}</h1>
        <div class="artist-stats">
          <div class="stat">
            <span class="stat-value">{{ artist.playCount }}</span>
            <span class="stat-label">plays</span>
          </div>
          <div class="stat">
            <span class="stat-value">{{ formatDuration(artist.duration) }}</span>
            <span class="stat-label">listened</span>
          </div>
        </div>
      </div>
    </div>

    <div class="content-section">
      <h2>Top Tracks</h2>
      <div class="tracks-table">
        <div v-for="(track, index) in artist.topTracks" :key="track.id" class="track-row">
          <div class="track-rank">#{{ index + 1 }}</div>
          <img :src="track.imageUrl" :alt="track.title" class="track-thumbnail" />
          <div class="track-info">
            <h3>{{ track.title }}</h3>
            <p>{{ track.playCount }} plays / {{ formatDuration(track.duration) }}</p>
          </div>
          <div class="track-progress">
            <div class="progress-bar">
              <div 
                class="progress-fill" 
                :style="{ width: `${(track.playCount / artist.topTracks[0].playCount) * 100}%` }"
              ></div>
            </div>
            <span class="progress-value">{{ Math.round((track.playCount / artist.topTracks[0].playCount) * 100) }}%</span>
          </div>
        </div>
      </div>
    </div>

    <div class="content-section">
      <h2>Albums</h2>
      <div class="albums-grid">
        <div v-for="album in artist.albums" :key="album.id" class="album-card">
          <img :src="album.imageUrl" :alt="album.title" class="album-image" />
          <div class="album-info">
            <h3>{{ album.title }}</h3>
            <p>{{ album.playCount }} plays / {{ formatDuration(album.duration) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchArtistDetails } from '@/services/mockData'

const route = useRoute()
const router = useRouter()
const artist = ref({
  id: '',
  name: '',
  imageUrl: '',
  playCount: 0,
  duration: 0,
  topTracks: [],
  albums: []
})

const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes}m`
  } else {
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`
  }
}

onMounted(async () => {
  const artistId = route.params.id as string
  artist.value = await fetchArtistDetails(artistId)
})
</script>

<style scoped>
.artist-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  margin-bottom: 20px;
  background: var(--card-background);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  color: var(--text-color);
  font-size: 0.9em;
  cursor: pointer;
  transition: all 0.2s;
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.05);
  transform: translateX(-2px);
}

.back-icon {
  font-size: 1.2em;
  line-height: 1;
}

.artist-header {
  display: flex;
  gap: 30px;
  margin-bottom: 40px;
  padding: 20px;
  background: var(--card-background);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  border: 1px solid var(--border-color);
}

.artist-image {
  width: 200px;
  height: 200px;
  border-radius: 8px;
  object-fit: cover;
}

.artist-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.artist-info h1 {
  color: var(--text-color);
  margin: 0 0 20px 0;
  font-size: 2em;
}

.artist-stats {
  display: flex;
  gap: 30px;
}

.stat {
  display: flex;
  flex-direction: column;
}

.stat-value {
  color: var(--text-color);
  font-size: 1.5em;
  font-weight: bold;
}

.stat-label {
  color: var(--text-secondary);
  font-size: 0.9em;
}

.content-section {
  margin-bottom: 40px;
}

.content-section h2 {
  color: var(--text-color);
  margin: 0 0 20px 0;
}

.tracks-table, .albums-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.track-card, .album-card {
  background: var(--card-background);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  border: 1px solid var(--border-color);
  position: relative;
  transition: transform 0.2s;
}

.track-card:hover, .album-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.4);
}

.track-image, .album-image {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
}

.track-info, .album-info {
  padding: 12px;
}

.track-info h3, .album-info h3 {
  color: var(--text-color);
  margin: 0 0 4px 0;
  font-size: 1em;
}

.track-info p, .album-info p {
  color: var(--text-secondary);
  margin: 0;
  font-size: 0.9em;
}

.tracks-table {
  background: var(--card-background);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  border: 1px solid var(--border-color);
  display: table;
  width: 100%;
}

.track-row {
  display: table-row;
  border-bottom: 1px solid var(--border-color);
}

.track-row:last-child {
  border-bottom: none;
}

.track-row:hover {
  background: rgba(255, 255, 255, 0.05);
}

.track-rank {
  display: table-cell;
  color: var(--text-secondary);
  font-size: 0.9em;
  font-weight: bold;
  text-align: center;
  padding: 12px;
  width: 60px;
  vertical-align: middle;
}

.track-thumbnail {
  display: table-cell;
  padding: 12px;
  width: 60px;
  vertical-align: middle;
}

.track-thumbnail img {
  width: 48px;
  height: 48px;
  border-radius: 4px;
  object-fit: cover;
}

.track-info {
  display: table-cell;
  padding: 12px;
  vertical-align: middle;
}

.track-info h3 {
  color: var(--text-color);
  margin: 0 0 4px 0;
  font-size: 1em;
}

.track-info p {
  color: var(--text-secondary);
  margin: 0;
  font-size: 0.9em;
}

.track-progress {
  display: table-cell;
  padding: 12px;
  width: 200px;
  vertical-align: middle;
}

.progress-bar {
  flex: 1;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--primary-color);
  border-radius: 3px;
  transition: width 0.3s ease;
}

.progress-value {
  color: var(--text-secondary);
  font-size: 0.9em;
  min-width: 45px;
  text-align: right;
}

.rank-badge {
  position: absolute;
  top: 8px;
  left: 8px;
  background: var(--primary-color);
  color: var(--background-color);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.9em;
  z-index: 1;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
}
</style> 