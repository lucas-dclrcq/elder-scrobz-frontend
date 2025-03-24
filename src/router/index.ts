import { createRouter, createWebHistory } from 'vue-router'
import StatsView from '@/views/StatsView.vue'
import ArtistView from '@/views/ArtistView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'stats',
      component: StatsView
    },
    {
      path: '/artist/:id',
      name: 'artist',
      component: ArtistView
    }
  ]
})

export default router 