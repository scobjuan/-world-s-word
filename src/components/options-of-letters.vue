<template>
  <div>
    <span class="option--btn hover:cursor-pointer transition-all" @click="event => goToWordGuess(event)">{{ props.text }}</span>
    <br />
  </div>
</template>

<script lang="ts" setup>

import { onMounted, defineProps } from 'vue'
import { useInitGame } from '../store/initGame'

const store = useInitGame()

const props = defineProps({
  'text': String,
	'quantityLetter': Number
})

const goToWordGuess = (event: MouseEvent) => {
  const allInputs = document.querySelectorAll('.option--btn')

  for (const input of allInputs) {
    input.classList.remove('onSelect')
  }

  const input = event.target as HTMLInputElement
  input.classList.add('onSelect')

  store.quantityOfLettersSelected = Number(props.quantityLetter)
}

</script>

<style>
.option--btn {
  position: relative;
}

.option--btn:hover {
  color: chocolate;
}

.onSelect::after {
  content: "";
  position: absolute;
  width: 5px;
  height: 5px !important;
  border-radius: 50%;
  top: calc(50% - 2.5px);
  right: calc(100% + 5px);
  background-color: white;
}
</style>
