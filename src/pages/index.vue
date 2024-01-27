<template>
  <div class="menu">
    <h1 class="mb-14 text-9xl font-bold">WORD-W</h1>

    <article class="menu__options mb-10">
      <OptionOfLetters :text="'TRES LETRAS'" :quantity-letter="3" />
      <OptionOfLetters :text="'CUATRO LETRAS'" :quantity-letter="4" />
      <OptionOfLetters :text="'CINCO LETRAS'" :quantity-letter="5" />
      <OptionOfLetters :text="'SEIS LETRAS'" :quantity-letter="6" />
    </article>

    <article class="menu__options flex items-center justify-center gap-2">
      <input class="border rounded-3xl px-4 py-2 hover:cursor-pointer" type="button" value="CANCELAR" @click="goToWordGuess()" /> <br>
      <input class="border rounded-3xl px-4 py-2 hover:cursor-pointer" type="button" value="RESOLVER" @click="goToWordGuess()" /> <br>
    </article>

    <footer class="absolute bottom-4 footer opacity-55 italic text-sm"> © 2024 Juan A. Escobar. Todos los derechos
      reservados.
    </footer>
  </div>
</template>

<script lang="ts" setup>
import OptionOfLetters from '../components/options-of-letters.vue';
import { useRouter } from 'vue-router'

const router = useRouter()
// const route = useRoute()

const goToWordGuess = () => {
  router.push({ name: 'word-guess' })
}
</script>

<style scoped>
.footer {
  left: calc(50% - 178.32px);
}

.menu__options {
  text-align: center;
}

.type_gradient-one {
  background-image: linear-gradient(90deg, #ff4d4d, #f9cb28);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
