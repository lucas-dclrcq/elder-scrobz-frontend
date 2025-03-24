<template>
  <div class="stats">
    <div class="global-filters">
      <UsernameSelector v-model="selectedUsers" @update:modelValue="fetchStats" />
    </div>

    <div class="stats-section">
      <div class="section-header">
        <h2>Artists Chart</h2>
        <TimeRangeSelector v-model="timeRanges.artists" @update:modelValue="fetchStats" />
      </div>
      <div class="grid-container">
        <div v-for="(artist, index) in stats.topArtists.slice(0, 5)" :key="artist.id" class="card">
          <div class="rank-badge">#{{ index + 1 }}</div>
          <router-link :to="{ name: 'artist', params: { id: artist.id }}">
            <img :src="artist.imageUrl" :alt="artist.name" class="card-image" />
          </router-link>
          <div class="card-content">
            <h3>{{ artist.name }}</h3>
            <p>{{ artist.playCount }} plays / {{ formatDuration(artist.duration) }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="stats-section">
      <div class="section-header">
        <h2>Tracks Chart</h2>
        <TimeRangeSelector v-model="timeRanges.tracks" @update:modelValue="fetchStats" />
      </div>
      <div class="grid-container">
        <div v-for="(track, index) in stats.topTracks.slice(0, 5)" :key="track.id" class="card">
          <div class="rank-badge">#{{ index + 1 }}</div>
          <img :src="track.imageUrl" :alt="track.title" class="card-image" />
          <div class="card-content">
            <h3>{{ track.title }}</h3>
            <p>{{ track.artist }}</p>
            <p>{{ track.playCount }} plays / {{ formatDuration(track.duration) }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="stats-section">
      <div class="section-header">
        <h2>Albums Chart</h2>
        <TimeRangeSelector v-model="timeRanges.albums" @update:modelValue="fetchStats" />
      </div>
      <div class="grid-container">
        <div v-for="(album, index) in stats.topAlbums.slice(0, 5)" :key="album.id" class="card">
          <div class="rank-badge">#{{ index + 1 }}</div>
          <img :src="album.imageUrl" :alt="album.title" class="card-image" />
          <div class="card-content">
            <h3>{{ album.title }}</h3>
            <p>{{ album.artist }}</p>
            <p>{{ album.playCount }} plays / {{ formatDuration(album.duration) }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="stats-section">
      <div class="section-header">
        <h2>Recent Tracks</h2>
      </div>
      <div class="stats-summary">
        <div class="stat-item">
          <span class="stat-label">Today</span>
          <span class="stat-value">7</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">This Week</span>
          <span class="stat-value">126</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">This Month</span>
          <span class="stat-value">199</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">This Year</span>
          <span class="stat-value">199</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">All Time</span>
          <span class="stat-value">199</span>
        </div>
      </div>
      <div class="recent-tracks-table">
        <div v-for="track in paginatedTracks" :key="track.id" class="recent-track-row">
          <div class="time-column">{{ formatTimeAgo(track.lastPlayed) }}</div>
          <div class="user-column">{{ track.user }}</div>
          <div class="track-column">
            <img :src="track.imageUrl" :alt="track.title" class="track-thumbnail" />
            {{ track.artist }} - {{ track.title }}
          </div>
        </div>
      </div>
      <div class="pagination">
        <button 
          class="page-btn" 
          :disabled="currentPage === 1"
          @click="currentPage--"
        >
          Previous
        </button>
        <span class="page-info">Page {{ currentPage }} of {{ totalPages }}</span>
        <button 
          class="page-btn" 
          :disabled="currentPage === totalPages"
          @click="currentPage++"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { TimeRange, MusicStats } from '@/types/music'
import { fetchMusicStats } from '@/services/mockData'
import TimeRangeSelector from '@/components/TimeRangeSelector.vue'
import UsernameSelector from '@/components/UsernameSelector.vue'

interface TimeRanges {
  artists: TimeRange
  tracks: TimeRange
  albums: TimeRange
  recent: TimeRange
}

const timeRanges = ref<TimeRanges>({
  artists: 'all',
  tracks: 'all',
  albums: 'all',
  recent: 'all'
})

const selectedUsers = ref<string[]>(['all'])

const stats = ref<MusicStats>({
  topArtists: [],
  topTracks: [],
  topAlbums: [],
  recentTracks: []
})

const ITEMS_PER_PAGE = 20
const currentPage = ref(1)

const totalPages = computed(() => {
  return Math.ceil(stats.value.recentTracks.length / ITEMS_PER_PAGE)
})

const paginatedTracks = computed(() => {
  const start = (currentPage.value - 1) * ITEMS_PER_PAGE
  const end = start + ITEMS_PER_PAGE
  return stats.value.recentTracks.slice(start, end)
})

const fetchStats = async () => {
  stats.value = await fetchMusicStats(timeRanges.value.artists)
  currentPage.value = 1 // Reset to first page when fetching new data
}

const formatTimeAgo = (timestamp: string): string => {
  const date = new Date(timestamp)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return 'just now'
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60)
    return `${minutes}m ago`
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600)
    return `${hours}h ago`
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400)
    return `${days}d ago`
  } else if (diffInSeconds < 2592000) {
    const weeks = Math.floor(diffInSeconds / 604800)
    return `${weeks}w ago`
  } else if (diffInSeconds < 31536000) {
    const months = Math.floor(diffInSeconds / 2592000)
    return `${months}mo ago`
  } else {
    const years = Math.floor(diffInSeconds / 31536000)
    return `${years}y ago`
  }
}

const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes}m`
  } else {
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`
  }
}

onMounted(() => {
  fetchStats()
})
</script>

<style scoped>
.stats {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.global-filters {
  margin-bottom: 30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
}

.stats-section {
  margin-bottom: 40px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

h2 {
  color: var(--text-color);
  margin: 0;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
  margin-bottom: 20px;
  align-items: start;
}

.grid-container .card {
  grid-column: span 1;
  grid-row: 1 / span 2;
}

.card {
  background: var(--card-background);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  transition: transform 0.2s;
  border: 1px solid var(--border-color);
  position: relative;
  aspect-ratio: 1;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.4);
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
}

.card-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 8px;
  background: linear-gradient(transparent, rgba(0,0,0,0.8));
  color: white;
}

.card-content h3 {
  margin: 0 0 4px 0;
  font-size: 0.9em;
  color: white;
}

.card-content p {
  margin: 2px 0;
  color: rgba(255,255,255,0.8);
  font-size: 0.8em;
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

.recent-tracks-table {
  background: var(--card-background);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  border: 1px solid var(--border-color);
  margin-bottom: 16px;
}

.recent-track-row {
  display: grid;
  grid-template-columns: 120px 150px 1fr;
  padding: 8px 12px;
  border-bottom: 1px solid var(--border-color);
  align-items: center;
}

.recent-track-row:last-child {
  border-bottom: none;
}

.recent-track-row:hover {
  background: rgba(255, 255, 255, 0.05);
}

.time-column {
  color: var(--text-secondary);
  font-size: 0.9em;
}

.user-column {
  color: var(--text-color);
  font-size: 0.9em;
}

.track-column {
  color: var(--text-color);
  font-size: 0.9em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  gap: 8px;
}

.track-thumbnail {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  object-fit: cover;
  flex-shrink: 0;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 16px;
}

.page-btn {
  padding: 6px 12px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background: var(--card-background);
  color: var(--text-color);
  cursor: pointer;
  font-size: 0.9em;
  transition: all 0.2s;
}

.page-btn:hover:not(:disabled) {
  background: var(--background-color);
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-info {
  color: var(--text-secondary);
  font-size: 0.9em;
}

.stats-summary {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  padding: 16px;
  background: var(--card-background);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  border: 1px solid var(--border-color);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}

.stat-label {
  color: var(--text-secondary);
  font-size: 0.9em;
  margin-bottom: 4px;
}

.stat-value {
  color: var(--text-color);
  font-size: 1.2em;
  font-weight: bold;
}
</style> 