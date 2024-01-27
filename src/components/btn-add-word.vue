<template>
  <button type="button"
    class="mt-2 mx-1 text-green-700 border border-green-700 hover:bg-green-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:focus:ring-green-800 dark:hover:bg-green-500"
    @click="addNewWord">
    <svg class="w-4 h-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960"
      width="24">
      <path d="M400-304 240-464l56-56 104 104 264-264 56 56-320 320Z" />
    </svg>
    <span class="sr-only">Icon description</span>
  </button>
</template>

<script lang="ts" setup>
import { defineEmits } from 'vue';

const emits = defineEmits(['addNewWord']);

const addNewWord = () => {
  emits('addNewWord')
}
</script>