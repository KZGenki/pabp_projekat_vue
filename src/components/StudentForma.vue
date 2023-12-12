<script setup>
import { onUpdated, ref, watch } from 'vue';
const props = defineProps(["student"])
const emits = defineEmits(["sacuvaj","nazad"])
const data = ref()
const ime = ref("")
const prezime = ref("")
const idStudenta = ref(-1)
const smer = ref("")
const broj = ref("")
watch(data,()=>{
    if(data.value){
        ime.value = data.value.ime
        prezime.value = data.value.prezime
        idStudenta.value = data.value.idStudenta
        smer.value = data.value.smer
        broj.value = data.value.broj
    }
    else{
        ime.value=""
        prezime.value=""
        smer.value=""
        broj.value=""
        idStudenta.value=-1
    }
})
onUpdated(()=>{
        data.value = props.student
})
</script>
<template>
    <div>
        <!-- <knob @click="$emit('nazad')">Nazad</knob> -->
        <table>
        <tr>
            <td>Ime: </td>
            <td><input type="text" v-model="ime"></td>
        </tr>
        <tr>
            <td>Prezime: </td>
            <td><input type="text" v-model="prezime"></td>
        </tr>
        <tr>
            <td>Smer: </td>
            <td><input type="text" v-model="smer"></td>
        </tr>
        <tr>
            <td>Broj: </td>
            <td><input type="text" v-model="broj"></td>
        </tr>
        <tr><td colspan="2"><knob style="width:100%" @click="$emit('sacuvaj',{idStudenta:idStudenta,ime:ime,prezime:prezime,smer:smer,broj:broj})" :boja="'PUT'">Sacuvaj</knob></td></tr>
    </table>
    </div>
</template>
<style scoped></style>