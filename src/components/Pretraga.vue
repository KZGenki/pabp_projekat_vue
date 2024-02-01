<script setup>
import { ref, watch } from 'vue';
const kriterijum = ref("")
const emits = defineEmits(["pretraga"])
// watch(kriterijum, () => {
//     emits('pretraga', kriterijum.value)
// })
</script>
<template>
    <div>
        <input type="text" v-model="kriterijum" placeholder="Pretraga">
        <knob @click="emits('pretraga', kriterijum)" :boja="'GET'">Pretrazi</knob>
    </div>
</template>
<style scoped></style>