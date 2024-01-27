<template>
  <div>
    <div v-for="(letter) in 5" :key="letter" class="flex items-center justify-center relative">
      <div v-for="(input) in props.quantityLetters" :key="input">
        <InputLetter />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import InputLetter from './input-letter.vue';

const props = defineProps({
  quantityLetters: Number,
})
</script>
