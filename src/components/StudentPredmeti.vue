<script setup>
import axios from 'axios'
import { onMounted, onUpdated, ref, watch } from 'vue';
const props = defineProps(["student"])
const predmeti = ref([])
const data = ref({
    idStudenta:-1,
    ime:"",
    prezime:"",
    smer:"",
    broj:"",
    godinaUpisa:"",
    studentPredmets:[],
    zapisniks:[]
})
const DohvatiPredmete = ()=>{
    axios.get('http://pabp.viser.edu.rs:8000/api/Predmets')
    .then((response)=>{
        predmeti.value = response.data
    }).catch(err=>alert(err))
}
onMounted(()=>{
    DohvatiPredmete()
})
onUpdated(()=>{
    data.value = props.student
})
watch(data,()=>{

})

</script>
<template>
    Student
    <table>
        <tr>
            <td>Ime</td>
            <td>{{ data.ime }}</td>
        </tr>
        <tr>
            <td>Prezime</td>
            <td>{{ data.prezime }}</td>
        </tr>
        <tr>
            <td>Indeks</td>
            <td>{{ data.smer }}-{{ data.broj }}/{{ data.godinaUpisa }}</td>
        </tr>
        <tr>
            <td>Predmeti</td>
            <td>
                {{ data.studentPredmets }}
            </td>
        </tr>
        <tr>
            <td>Zapisnici</td>
            <td>
                {{ data.zapisniks }}
            </td>
        </tr>
    </table>
</template>
<style scoped></style>