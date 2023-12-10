<script setup>
import { ref, watch } from 'vue';
const kriterijum = ref("")
const emits = defineEmits(["pretraga"])
watch(kriterijum, () => {
    emits('pretraga', kriterijum.value)
})
</script>
<template>
    <input type="text" v-model="kriterijum" placeholder="Pretraga">
</template>
<style scoped></style>