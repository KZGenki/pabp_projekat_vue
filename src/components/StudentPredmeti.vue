<script setup>
import Predmet from './Predmet.vue';
import Student from './Student.vue';
import DodajPredmet from './DodajPredmet.vue';
import { onUpdated, ref, watch, inject } from 'vue';
const props = defineProps(["student"])
const emits = defineEmits(["nazad","dodaj_predmet"])
const idZapisniks = ref({})
const predmeti = ref([]) 
const predmets = inject("predmeti")
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
onUpdated(()=>{
    console.log("zapisnici",props.student.zapisniks);
    console.log("sp",props.student.studentPredmets);
    if(data.value != props.student){
        data.value = props.student
        idZapisniks.value = []
        data.value.zapisniks.forEach((zapisnik)=>{
            idZapisniks.value[zapisnik.idIspitaNavigation.idPredmeta] = zapisnik.ocena
        })
    }
})
const updateStudentPredmets = ()=>{
    predmeti.value = data.value.studentPredmets.filter((sp)=>{
        if(nepolozeni.value){
            if(sp.idPredmeta in idZapisniks.value){
                if(idZapisniks.value[sp.idPredmeta]>5){
                    return false
                }
            }
            return true
        }
        else{
            return true
        }
    })
}
watch(data,()=>{
    updateStudentPredmets()
})
watch(nepolozeni, ()=>{
    updateStudentPredmets()
})

</script>
<template>
    <button @click="$emit('nazad')">Nazad</button>
    <Student :student="data"></Student>
    <DodajPredmet :student="data" @dodaj="(predmetId, studentId) => emits('dodaj_predmet', predmetId, studentId)"></DodajPredmet>
    <table>
        <label for="nepolozeni">Prikazi samo nepolozene</label><input type="checkbox" id="nepolozeni" v-model="nepolozeni">
        <tr>
            <td>Prijavljeni predmeti</td>
            <td>Zapisnici</td>  
        </tr>
        <tr>
            <td style="vertical-align: top;">
                <Predmet v-for="studentPredmet in predmeti" :predmet="studentPredmet.idPredmetaNavigation"></Predmet>
            </td>
            <td style="vertical-align: top;">
                <Predmet v-for="zapisnik in data.zapisniks" :predmet="predmets.find((sp)=>sp.idPredmeta == zapisnik.idIspitaNavigation.idPredmeta)" :ocena="zapisnik.ocena"></Predmet>            
            </td>
        </tr>
    </table>
</template>
<style scoped></style>