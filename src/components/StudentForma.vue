<script setup>
import { ref } from 'vue';
const props = defineProps(["student"])
const emits = defineEmits(["sacuvaj","nazad"])
const data = ref()
const ime = ref(props.student.ime)
const prezime = ref(props.student.prezime)
const idStudenta = ref(props.student.idStudenta)
const smer = ref(props.student.smer)
const broj = ref(props.student.broj)

</script>
<template>
    <div>
        <knob @click="$emit('nazad')">Nazad</knob>
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