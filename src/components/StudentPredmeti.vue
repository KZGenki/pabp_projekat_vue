<script setup>
import Predmet from './Predmet.vue';
import { computed, onMounted, onUpdated, ref, watch } from 'vue';
const props = defineProps(["student"])
const polozeniPredmeti = ref([])
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

onMounted(()=>{

})
onUpdated(()=>{
    data.value = props.student
    polozeniPredmeti.value = []
    data.value.zapisniks.forEach((zapisnik)=>{
        polozeniPredmeti.value.push(zapisnik.idIspitaNavigation.idPredmeta)
    })
    //console.log(data);
})
watch(data,()=>{

})

const predmeti = computed(()=>{
    if(data.value.idStudenta == -1){
        return []
    }else{
        console.log(2, data);
        return data.value.studentPredmets.filter((sp)=>{
        if(sp.idPredmeta in polozeniPredmeti.value){
            return true
        }else{
            return false
        }
    })
    }
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
            <td>Prijavljeni predmeti</td>
            <td>
                <!-- {{ data.studentPredmets[0] }} -->
                <Predmet v-for="studentPredmet in data.studentPredmets" :predmet="studentPredmet.idPredmetaNavigation"></Predmet>
            </td>
        </tr>
        <tr>
            <td>Polozeni predmeti</td>
            <td>
                {{ data.zapisniks[0] }}
            </td>
        </tr>
    </table>
</template>
<style scoped></style>