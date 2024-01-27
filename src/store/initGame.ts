import { defineStore } from 'pinia';
import { ref, Ref } from 'vue';

export const useInitGame = defineStore('initGame', () => {
  const quantityOfLettersSelected: Ref<number | undefined> = ref(0)

  return { quantityOfLettersSelected }
})
