<script setup>
import { computed, ref } from 'vue';
let p = ref(0)
const props = defineProps(["student","ocena"])
const prosek = computed(()=>{
    p.value = 0
    let count = 0
    if(props.student.zapisniks.length>0){
        props.student.zapisniks.forEach(zapisnik => {
            if(zapisnik.ocena>5){
                p.value+=zapisnik.ocena
                count++
            }
        });
        p.value = p.value/count
    }
    return p 
})
</script>
<template>
    <div>
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
            <td>{{ props.student.brojIndeksa }}</td>
        </tr>
        <tr>
            <td>Prosek</td>
            <td>{{ props.ocena }}</td>
        </tr>
    </table>
    </div>
</template>
<style scoped></style>