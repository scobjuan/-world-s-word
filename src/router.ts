import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/index.vue'
import WordGuess from './pages/word-guess.vue'
import CorrectWord from './pages/correct-word.vue'
import notGuessedWord from './pages/not-guessed-word.vue'

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
    },
		{
			name: 'correct-word',
			path: '/correct-word',
			component: CorrectWord
		},
		{
			name: 'not-guessed-word',
			path: '/not-guessed-word',
			component: notGuessedWord
		}
  ],
})
