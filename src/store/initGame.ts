import { defineStore } from 'pinia';
import { ref, Ref } from 'vue';
// import {words} from 'palabras-aleatorias-data'
import axios from 'axios';

export const useInitGame = defineStore('initGame', () => {
	const wordToGuess:Ref<string> = ref('')
  const quantityOfLettersSelected: Ref<number | undefined> = ref(0)

	const validateFormatOfWord = (word: string) => {
		const lettterToLetter = word.split('')

		if (lettterToLetter.find(caracter => !/[a-zA-Z]/.test(caracter) || caracter === ' ' || caracter === 'x' || caracter === 'w')) return false
	
		return true
	}

	const getRamdomWord = async () => {
		const response = await axios.get(`https://random-word-api.herokuapp.com/word?length=${quantityOfLettersSelected.value}&lang=es`)
		return response.data[0]
	}

	const getWord = async (): Promise<string> => {
		const ramdomWord = await getRamdomWord()

		const isWordValid = validateFormatOfWord(ramdomWord)

		if (isWordValid) {
			wordToGuess.value = ramdomWord.toLowerCase()
			return ramdomWord
		}

		return getWord()
	}

  return { quantityOfLettersSelected, wordToGuess, getWord }
})
