<script setup>
import { computed, ref } from 'vue';
let p = ref(0)
const props = defineProps(["student"])
const prosek = computed(()=>{
    p.value = 0
    if(props.student.zapisniks.length>0){
        props.student.zapisniks.forEach(zapisnik => {
            p.value+=zapisnik.ocena
        });
        p.value = p.value/props.student.zapisniks.length
    }
    return p 
})
</script>
<template>
    <table>
        <h2>Student</h2>
        <tr>
            <td>Ime</td>
            <td>{{ props.student.ime }}</td>
        </tr>
        <tr>
            <td>Prezime</td>
            <td>{{ props.student.prezime }}</td>
        </tr>
        <tr>
            <td>Indeks</td>
            <td>{{ props.student.smer }}-{{ props.student.broj }}/{{ props.student.godinaUpisa }}</td>
        </tr>
        <tr>
            <td>Prosek</td>
            <td>{{ parseFloat(prosek.value).toFixed(2) }}</td>
        </tr>
    </table>
</template>
<style scoped></style>