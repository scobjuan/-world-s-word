<template>
  <div>
    <input id="new-word" :value="insideValue" type="text" placeholder="Ingrese una palabra"
      class="bg-transparent mt-10 py-2 border border-[#ffffff17] rounded-md focus:outline-none text-white font-bold text-center w-full"
      @focus="cleanPlaceholder" @blur="putPlaceholder" @input="event => onChangedCurrentWord(event)">
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref, Ref, onMounted, watch } from 'vue';

const props = defineProps({ 'currentWord': String })

const emits = defineEmits<{
  changedCurrentWord: [value: string]
}>()

// const currentWord: Ref<string> = ref('')
const insideValue: Ref<string | undefined> = ref('')


onMounted(() => {
  const input = ref(document.getElementById('new-word'))
  input.value?.focus()
})

watch(() => props.currentWord, (newVal) => {
  insideValue.value = newVal
})

const onChangedCurrentWord = (event: Event) => {
  const eventTarget = (event?.target) as HTMLInputElement
  insideValue.value = eventTarget.value
  emits('changedCurrentWord', insideValue.value)
}

const cleanPlaceholder = () => {
  const input = document.getElementById('new-word') as HTMLInputElement
  input.placeholder = ''
}

const putPlaceholder = () => {
  const input = document.getElementById('new-word') as HTMLInputElement
  input.placeholder = 'Ingrese una palabra'
}
</script>