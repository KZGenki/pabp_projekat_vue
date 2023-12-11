<script setup>
import Predmet from './Predmet.vue';
import Student from './Student.vue';
import DodajPredmet from './DodajPredmet.vue';
import { onUpdated, ref, watch, inject } from 'vue';
const props = defineProps(["student"])
const emits = defineEmits(["nazad","dodaj_predmet","ukloni_predmet"])
const idZapisniks = ref({})
const predmeti = ref([]) 
const predmets = inject("predmeti")
const nepolozeni = ref(false)
const update = ref(false)
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
    if(data.value != props.student){
        data.value = props.student
        idZapisniks.value = []
        data.value.zapisniks.forEach((zapisnik)=>{
            idZapisniks.value[zapisnik.idIspitaNavigation.idPredmeta] = zapisnik.ocena
        })
    }
    if(update.value){
        console.log(update.value);
        updateStudentPredmets()
        update.value=false
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
const ukloni = (predmetId, studentId)=>{
    emits("ukloni_predmet", predmetId, studentId)
    update.value=true
    

}
</script>
<template>
    <div>
        <button @click="$emit('nazad')">Nazad</button>
    <Student :student="data"></Student>
    <DodajPredmet :student="data" @dodaj="(predmetId, studentId) => {emits('dodaj_predmet', predmetId, studentId); update=true}"></DodajPredmet>
    <table>
        <label for="nepolozeni">Prikazi samo nepolozene</label><input type="checkbox" id="nepolozeni" v-model="nepolozeni">
        <tr>
            <td>Prijavljeni predmeti</td>
            <td>Zapisnici</td>  
        </tr>
        <tr>
            <td style="vertical-align: top;">
                <Predmet v-for="studentPredmet in predmeti" :predmet="studentPredmet.idPredmetaNavigation" @ukloni="ukloni(studentPredmet.idPredmeta, studentPredmet.idStudenta)"></Predmet>
            </td>
            <td style="vertical-align: top;">
                <Predmet v-for="zapisnik in data.zapisniks" :predmet="predmets.find((sp)=>sp.idPredmeta == zapisnik.idIspitaNavigation.idPredmeta)" :ocena="zapisnik.ocena"></Predmet>            
            </td>
        </tr>
    </table>
    </div>
</template>
<style scoped></style>