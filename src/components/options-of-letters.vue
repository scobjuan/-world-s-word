<template>
	<div class="home__menu--option options hover:cursor-pointer" @click="goToWordGuess()">{{ props.text }} <div class="options--border-buttom"></div></div>
</template>

<script lang="ts" setup>

import { defineProps } from 'vue'
import { useInitGame } from '../store/initGame'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useInitGame()

const props = defineProps({
  'text': String,
	'quantityLetter': Number
})

const goToWordGuess = () => {
  store.quantityOfLettersSelected = Number(props.quantityLetter)
	router.push({ name: 'word-guess' })
}

</script>
