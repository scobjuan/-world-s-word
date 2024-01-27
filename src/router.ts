import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/index.vue'
import WordGuess from './pages/word-guess.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home,
    },
    {
      name: 'word-guess',
      path: '/wordguess',
      component: WordGuess,
      // children: [{ path: '/correctword', component: () => import() }]
    },
  ],
})