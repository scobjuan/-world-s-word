<template>
  <button id="button-redo" type="button" @click="cleanCurrentWord"
    class="my-2 mx-1 text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500">
    <svg class="w-4 h-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960"
      width="24">
      <path d="m336-280-56-56 144-144-144-143 56-56 144 144 143-144 56 56-144 143 144 144-56 56-143-144-144 144Z" />
    </svg>
    <span class="sr-only">Icon description</span>
  </button>
</template>

<script lang="ts" setup>
import { defineEmits } from 'vue';

const emits = defineEmits(['currentWord'])


const cleanCurrentWord = () => {
  emits('currentWord')
}
</script>