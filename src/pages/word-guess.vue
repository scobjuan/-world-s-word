<script setup lang="ts">
import { ref } from 'vue';
import InputWord from '../components/input-word.vue';
import TableComponent from '../components/table-component.vue';
import BtnCleanWord from '../components/btn-clean-word.vue';
import BtnAddWord from '../components/btn-add-word.vue';
import ILettersAndQuantities from '../src/interfaces/lettersAndQuantities'

import { useInitGame } from '../store/initGame';

const currentRow = ref(1)

const currentWord = ref('')

const destinityWord = 'palabra'
// const quantityLetters = destinityWord.length
const lettersAndQuantity: ILettersAndQuantities = {}

const store = useInitGame()
const quantityLetters = store.quantityOfLettersSelected

const onChangedCurrentWord = (val: string) => {
	console.log(val)
	currentWord.value = val
}

const addNewWord = () => {
	console.log('Hi ', currentWord.value)
	const quantityLettersOfCurrentWord = currentWord.value.length
	if (quantityLettersOfCurrentWord === 0 || quantityLettersOfCurrentWord < quantityLetters || quantityLettersOfCurrentWord > quantitySelected) return false

	const allInputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('.input-word-validate')
	const currentWordToArray = currentWord.value.split('')

	for (let i = 0; i < quantityLetters; i++) {
		if (currentRow.value === 1) {
			allInputs[i].value = currentWordToArray[i].toUpperCase()
		} else {
			const position = (currentRow.value * quantitySelected) - (quantitySelected - i)
			if (!allInputs[position]) return
			allInputs[position].value = currentWordToArray[i].toUpperCase()
		}
	}

	const isCorrectTheWord = validateWord()
	validateLetterPerLetter(currentRow.value)
	orangeColor(currentRow.value)
	currentWord.value = ''

	if (isCorrectTheWord) alert('Felicidades!, Haz encontrado la palabra del día')
	else if (currentRow.value === 5) alert('Juego terminado. No has encontrado la palabra del día')

	goToNextRow()
	return true
}

const cleanCurrentWord = () => {
	currentWord.value = ''
}

const goToNextRow = () => {
	currentRow.value++
	const allInputs = document.querySelectorAll('.input-word-validate')

	const nextRow = (currentRow.value * quantitySelected) + 1

	allInputs[nextRow]
}

const validateWord = () => {
	if (currentWord.value === destinityWord) {
		return true
	}

	return false
}

const validateLetterPerLetter = (column: number) => {
	const arrayOfLettersCurrentWord = currentWord.value.split('')
	const arrayOfLettersDestinityWord = destinityWord.split('')

	const positionsWithCorrectLetter: Array<number> = []

	arrayOfLettersCurrentWord.forEach((letter: string) => {
		if (arrayOfLettersDestinityWord.includes(letter) && !lettersAndQuantity.hasOwnProperty(letter)) lettersAndQuantity[letter] = arrayOfLettersDestinityWord.filter(value => value === letter).length
	})

	arrayOfLettersCurrentWord.forEach((letter: string, index: number) => {
		if (letter === arrayOfLettersDestinityWord[index]) {
			positionsWithCorrectLetter.push(index)
			lettersAndQuantity[letter] = lettersAndQuantity[letter] - 1
		}
	})

	const allInputs = document.querySelectorAll('input')
	const quantityOfCorrectLetters = positionsWithCorrectLetter.length


	if (quantityOfCorrectLetters === 0) return

	for (let i = 0; i < quantityOfCorrectLetters; i++) {
		let position = positionsWithCorrectLetter[i]

		if (column >= 2) position = (column * quantitySelected) - (quantitySelected - positionsWithCorrectLetter[i])

		allInputs[position].style.backgroundColor = 'green'
	}
}

const orangeColor = (column: number) => {
	const arrayOfLettersDestinityWord = destinityWord.split('')
	const arrayOfLettersCurrentWord = currentWord.value.split('')

	const mismatchedLettersPositions: Array<number> = []


	console.log(lettersAndQuantity['a'])

	arrayOfLettersCurrentWord.forEach((letter: string, index: number) => {
		if (arrayOfLettersDestinityWord.includes(letter) && lettersAndQuantity[letter] > 0) {
			lettersAndQuantity[letter] = lettersAndQuantity[letter] - 1
			mismatchedLettersPositions.push(index)
		}
	})


	const allInputs = document.querySelectorAll('input')
	const quantityOfMismatchedWords = mismatchedLettersPositions.length

	if (quantityOfMismatchedWords === 0) return

	for (let i = 0; i < quantityOfMismatchedWords; i++) {
		let position = mismatchedLettersPositions[i]

		if (column >= 2) position = (column * quantitySelected) - (quantitySelected - mismatchedLettersPositions[i])

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
	color: rgba(255, 255, 255, 0.8quantitySelected);
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
