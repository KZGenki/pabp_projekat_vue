<script setup>
import { ref, computed, inject, onUpdated, watch } from 'vue';

const props = defineProps(["student","slusa"])
const emits = defineEmits(["dodaj"])
const studentId = ref(-1)
const studentPredmets = ref([])
const predmeti = inject("predmeti")
const update = ref(false)

const dostupniPredmeti = computed(()=>{
    return predmeti.value.filter((predmet)=>{
        return props.slusa.find((p)=>{return p.idPredmeta == predmet.idPredmeta}) === undefined
    })
})
const idPredmeta = ref(-1)
</script>
<template>
    Dodaj novi predmet <br>
     <!-- {{ dostupniPredmeti }}  -->
    <!-- <p v-for="predmet in dostupniPredmeti">{{ predmet.naziv }} {{ predmet.idPredmeta }}</p> -->
    <select name="" id="" v-model="idPredmeta">
        <option v-for="predmet in dostupniPredmeti" :value="predmet.idPredmeta">{{ predmet.naziv }}</option>
    </select>
    <knob @click="()=>{emits('dodaj',idPredmeta, props.student.idStudenta);}" :disabled="idPredmeta==-1?true:false" :boja="'POST'">Dodaj</knob>
</template>
<style scoped></style>