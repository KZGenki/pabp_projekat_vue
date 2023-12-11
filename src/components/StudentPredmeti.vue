<script setup>
import Predmet from './Predmet.vue';
import { computed, onMounted, onUpdated, ref, watch } from 'vue';
const props = defineProps(["student"])
const idPolozeniPredmeti = ref({})
const predmeti = ref([])
const nepolozeni = ref(false)
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
    if(data.value != props.student){
        data.value = props.student
        idPolozeniPredmeti.value = []
        data.value.zapisniks.forEach((zapisnik)=>{
            idPolozeniPredmeti.value[zapisnik.idIspitaNavigation.idPredmeta] = 1
        })
    }
})
const updateStudentPredmets = ()=>{
    predmeti.value = data.value.studentPredmets.filter((sp)=>{//this is broken
        if(!(sp.idPredmeta in idPolozeniPredmeti.value) || !nepolozeni.value){
            return true
        }else{
            return false
        }
    })
}
watch(data,()=>{
    updateStudentPredmets()
})
watch(nepolozeni, ()=>{
    console.log(nepolozeni);
    updateStudentPredmets()
    console.log(predmeti.value);
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
            <td>Prijavljeni predmeti <input type="checkbox" name="" id="" v-model="nepolozeni">{{ nepolozeni }}</td>
            <td>
                <!-- {{ data.studentPredmets[0] }} -->
                <!-- <Predmet v-for="studentPredmet in data.studentPredmets" :predmet="studentPredmet.idPredmetaNavigation"></Predmet> -->
                <Predmet v-for="studentPredmet in predmeti" :predmet="studentPredmet.idPredmetaNavigation"></Predmet>
            </td>
        </tr>
        <tr>
            <td>Polozeni predmeti</td>
            <td>
                <tr v-for="zapisnik in data.zapisniks">
                    <td> {{ data.studentPredmets.find((sp)=>sp.idPredmeta == zapisnik.idIspitaNavigation.idPredmeta).idPredmetaNavigation.naziv }}</td>
                    <td> {{ zapisnik.ocena }}</td>
                </tr>
            </td>
        </tr>
    </table>
</template>
<style scoped></style>