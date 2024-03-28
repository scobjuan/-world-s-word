<script setup lang="ts">
	import { ref } from 'vue';

	import { useRouter } from 'vue-router';
	import BackgroundImage from '../components/background-image.vue'

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

	<div class="z-10 text-2xl font-bold">Juego terminado. No haz adivinado la palabra del día.</div>
	<div class="z-10 text-2xl font-bold animate-pulse">🫨</div>
	<div class="absolute bottom-10 w-full text-center">
		<div>Redirigiendo a la página principal en:</div>
		<div>{{ seconds }}</div>
	</div>
</template>
