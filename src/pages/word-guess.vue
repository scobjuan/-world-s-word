<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import InputWord from '../components/input-word.vue';
import TableComponent from '../components/table-component.vue';
import BtnCleanWord from '../components/btn-clean-word.vue';
import BtnAddWord from '../components/btn-add-word.vue';
import ILettersAndQuantities from '../src/interfaces/lettersAndQuantities'

import { useInitGame } from '../store/initGame';
import router from '../router';

const currentRow = ref(1)

const currentWord = ref('')

const lettersAndQuantity: ILettersAndQuantities = {}
let copyLettersAndQuantity: ILettersAndQuantities = {}

const store = useInitGame()
const quantityLetters = store.quantityOfLettersSelected
const destinityWord = ref('')

const onChangedCurrentWord = (val: string) => {
	currentWord.value = val
}

onBeforeMount(async () => {
	if (!store.quantityOfLettersSelected) return router.push({ name: 'home' })

	await useInitGame().getWord()

	destinityWord.value = store.wordToGuess
})

const goToHome = () => {
	store.quantityOfLettersSelected = 0
	store.wordToGuess = ''
  router.push({ name: 'home' })
}

const addNewWord = () => {
	if (!quantityLetters) return
	const quantityLettersOfCurrentWord = currentWord.value.length
	if (quantityLettersOfCurrentWord === 0 || quantityLettersOfCurrentWord < quantityLetters || quantityLettersOfCurrentWord > quantityLetters) return false

	const allInputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('.input-word-validate')
	const currentWordToArray = currentWord.value.split('')

	for (let i = 0; i < quantityLetters; i++) {
		if (currentRow.value === 1) {
			allInputs[i].value = currentWordToArray[i].toUpperCase()
		} else {
			const position = (currentRow.value * quantityLetters) - (quantityLetters - i)
			if (!allInputs[position]) return
			allInputs[position].value = currentWordToArray[i].toUpperCase()
		}
	}

	const isCorrectTheWord = validateWord()
	validateLetterPerLetter(currentRow.value)
	orangeColor(currentRow.value)
	currentWord.value = ''

	if (isCorrectTheWord) router.push({ name: 'correct-word' })
	else if (currentRow.value === 5) router.push({ name: 'not-guessed-word' })

	goToNextRow()
	return true
}

const cleanCurrentWord = () => {
	currentWord.value = ''
}

const goToNextRow = () => {
	currentRow.value++
	const allInputs = document.querySelectorAll('.input-word-validate')

	if (!quantityLetters) return

	const nextRow = (currentRow.value * quantityLetters) + 1

	allInputs[nextRow]
}

const validateWord = () => {
	if (currentWord.value === destinityWord.value) {
		return true
	}

	return false
}

const validateLetterPerLetter = (column: number) => {
	const arrayOfLettersCurrentWord = currentWord.value.split('')
	const arrayOfLettersDestinityWord = destinityWord.value.split('')

	const positionsWithCorrectLetter: Array<number> = []

	arrayOfLettersCurrentWord.forEach((letter: string) => {
		if (arrayOfLettersDestinityWord.includes(letter) && !lettersAndQuantity.hasOwnProperty(letter)) lettersAndQuantity[letter] = arrayOfLettersDestinityWord.filter(value => value === letter).length
	})

	copyLettersAndQuantity = {...lettersAndQuantity}

	arrayOfLettersCurrentWord.forEach((letter: string, index: number) => {
		if (letter === arrayOfLettersDestinityWord[index] && copyLettersAndQuantity[letter] > 0) {
			positionsWithCorrectLetter.push(index)
			copyLettersAndQuantity[letter]--
		}
	})

	const allInputs = document.querySelectorAll('input')
	const quantityOfCorrectLetters = positionsWithCorrectLetter.length


	if (quantityOfCorrectLetters === 0) return

	for (let i = 0; i < quantityOfCorrectLetters; i++) {
		let position = positionsWithCorrectLetter[i]

		if (!quantityLetters) return

		if (column >= 2) position = (column * quantityLetters) - (quantityLetters - positionsWithCorrectLetter[i])

		allInputs[position].style.backgroundColor = 'green'
	}
}

const orangeColor = (column: number) => {
	if (Object.entries(copyLettersAndQuantity).length === 0) copyLettersAndQuantity = {...lettersAndQuantity}
	const allInputs = document.querySelectorAll('input')
	
	const arrayOfLettersDestinityWord = destinityWord.value.split('')
	const arrayOfLettersCurrentWord = currentWord.value.split('')

	const mismatchedLettersPositions: Array<number> = []

	arrayOfLettersCurrentWord.forEach((letter: string, index: number) => {
		console.log(letter)
		if (arrayOfLettersDestinityWord.includes(letter) && copyLettersAndQuantity[letter] > 0) {
			copyLettersAndQuantity[letter]--
			mismatchedLettersPositions.push(index)
		}
	})


	const quantityOfMismatchedWords = mismatchedLettersPositions.length

	if (quantityOfMismatchedWords === 0) return

	for (let i = 0; i < quantityOfMismatchedWords; i++) {
		let position = mismatchedLettersPositions[i]

		if (!quantityLetters) return

		if (column >= 2) position = (column * quantityLetters) - (quantityLetters - mismatchedLettersPositions[i])

		if (allInputs[position].style.backgroundColor === 'green') return
		allInputs[position].style.backgroundColor = 'orange'
	}
}
</script>

<template>
	<div class="content text-center">
		<!-- <h2 class="mb-20 mx-none px-none">
			!Bienvenido a
			<span class="type_gradient-one">Word</span>
			Of The
			<span class="type_gradient-one">World!</span>
		</h2> -->

		<div class="absolute m-10 hover:cursor-pointer" @click="goToHome()">
			<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
				<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"/>
			</svg>
		</div>

		<TableComponent :quantityLetters="quantityLetters" />

		<InputWord @changedCurrentWord="val => onChangedCurrentWord(val)" @keyup.enter="addNewWord"
			:currentWord="currentWord" />

		<div>
			<BtnCleanWord @current-word="cleanCurrentWord"></BtnCleanWord>

			<BtnAddWord @add-new-word="addNewWord"></BtnAddWord>
		</div> 
		<router-view></router-view>
	</div>
</template>

<style scoped>
.content {
	width: 100vw;
	height: 100vh;
	background-color: #000;
	display: grid;
	place-content: center;
	color: rgba(255, 255, 255, 0.8quantityLetters);
}

h2 {
	font-size: 38px;
	font-weight: 800;
	letter-spacing: -.05em;
	position: relative;
}

input {
	border: 1px solid #ffffff17;
}

h2::before {
	content: "";
	width: 100%;
	height: .5px;
	position: absolute;
	top: -10px;
	left: 0;
	background-color: rgba(255, 255, 255, 0.20);
}

.type_gradient-one {
	background-image: linear-gradient(90deg, #ff4d4d, #f9cb28);
	-webkit-background-clip: text;
	background-clip: text;
	-webkit-text-fill-color: transparent;
}

.type_gradient-one--button {
	background-image: linear-gradient(90deg, #ff4d4d, #f9cb28);
}

.hovered__path {
	stroke: white;
}

.noHovered__path {
	stroke: #b43333;
}
</style>
