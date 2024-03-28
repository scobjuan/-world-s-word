<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import BackgroundImage from '../components/background-image.vue';

const router = useRouter()
const seconds = ref(5)

setInterval(() => {
	seconds.value--
	if (seconds.value === 0) {
		router.push({ name: 'home' })
	}
}, 1000)
</script>

<template>
	<BackgroundImage />
	
	<div class="z-10 text-2xl font-bold">
		<div>Felicidades, has adivinado la palabra del dia!</div>
		<div class="animate-pulse">🎉</div>
	</div>

	<div class="absolute bottom-10 w-full text-center">
		<div>Redirigiendo a la página principal en:</div>
		<div>{{ seconds }}</div>
	</div>
</template>

<style>
  .background {
		position: absolute;
		width: 100%;
		height: 100%;
		background: url('../assets/background.webp');
		background-size: cover;
		background-position: center center;
		background-repeat: no-repeat;
		aspect-ratio: 16 / 9;
		opacity: .7;
	}
</style>
