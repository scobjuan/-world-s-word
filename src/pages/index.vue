<template>
	<div class="home--background"></div>
  <div class="home__presentation">
		<h1 class="home__presentation--title mb-4 text-8xl font-bold relative">
			WORLD-W
		</h1>
		<h2 class="home__presentation--subtitle mb-4 text-sm relative w-[300px] text-center my-0 mx-auto">¡Descifra, conquista, triunfa! Domina el arte de las palabras en nuestro juego de adivinar.</h2>

		<a class="home__presentation--button button w-40 h-14 text-center flex row items-center justify-center relative" href="https://github.com/scobjuan/world-word" target="_blank">
			<span class="button--text" >
				SEGUIR
			</span>
			<svg class="button--icon w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
				<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width=".5" d="M8 16.9V7a1 1 0 0 1 1.6-.8l6 5a1 1 0 0 1 0 1.5l-6 4.9a1 1 0 0 1-1.6-.8Z"/>
			</svg>
		</a>

		<article class="home__menu absolute bottom-4 menu__options">
			<div class="home__menu--title">WordW</div>
			<OptionOfLetters :text="'TRES LETRAS'" :quantity-letter="3" />
			<OptionOfLetters :text="'CUATRO LETRAS'" :quantity-letter="4" />
			<OptionOfLetters :text="'CINCO LETRAS'" :quantity-letter="5" />
			<OptionOfLetters :text="'SEIS LETRAS'" :quantity-letter="6" />
		</article>
  </div>
</template>

<script lang="ts" setup>
	import OptionOfLetters from '../components/options-of-letters.vue';
	import { onMounted } from 'vue';

	onMounted(() => {
		const options = Array.from(document.getElementsByClassName('options')) as HTMLElement[]

		options.forEach((option: HTMLElement) => {
			option.addEventListener('mouseover', () => {
				option.children[0].classList.remove('onInactive')
				option.children[0].classList.add('onActive')	
			})

			option.addEventListener('mouseout', () => {
				option.children[0].classList.remove('onActive')
				option.children[0].classList.add('onInactive')
			})
		})
	})
</script>

<style>
  .home--background {
		position: absolute;
		width: 100%;
		height: 100%;
		background: url('../assets/background.webp');
		background-size: cover;
		background-position: center center;
		background-repeat: no-repeat;
		aspect-ratio: 16 / 9;
	}

	.home__presetation--title {
		display: flex;
		text-align: center;
		justify-items: center;
		justify-content: center;
		align-items: center;
	}

	.home__presentation--button {
		border: 1px solid #ffffff40;
		border-radius: 3px;
		font-size: 12px;
		margin: 0 auto;
	}

	.home__menu {
		left: calc(50% - 240px);
		text-align: center;
		display: flex;
		flex-direction: row;
		justify-content: center;
		justify-items: center;
		align-items: center;
		gap: 10px;
		border: 1px solid white;
		padding: 0px 25px;
		border-radius: 4px;
		backdrop-filter: blur(4px);
	}

	.home__menu div {
		font-size: 12px;
		text-transform: uppercase;
		opacity: .7;
		position: relative;

	}

	.options {
		padding: 18px 0;
	}

	.options--border-buttom {
		position: absolute;
		left: 0;
		top: calc(100% + 2px);
		height: 1px;
		transition: all .3s ease;
	}

	.home__menu div:nth-child(1) { 
		font-weight: bold;
		opacity: 1;
	}

	.onActive {
		background-color: white;
		animation: onHover .3s ease;
	}

	.onInactive {
		animation: onRemoveHover .3s ease;
	}

	@keyframes onHover {
		0% {
			width: 0%;
		}
		100% {
		 width: 100%;
		}
	}

	@keyframes onRemoveHover {
		0% {
			background-color: white;
			width: 100%;
		}
		100% {
			background-color: transparent;
			width: 0%;
		}
	}

	@media (max-width: 1700px) {
		.home__background picture img {
			max-width: none;
		}
	}
</style>
