<script setup>
import Predmet from './Predmet.vue';
import Student from './Student.vue';
import DodajPredmet from './DodajPredmet.vue';
import { onUpdated, ref, watch } from 'vue';
const props = defineProps(["student"])
const idZapisniks = ref({})
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
onUpdated(()=>{
    if(data.value != props.student){
        data.value = props.student
        idZapisniks.value = []
        data.value.zapisniks.forEach((zapisnik)=>{
            idZapisniks.value[zapisnik.idIspitaNavigation.idPredmeta] = zapisnik.ocena
        })
    }
})
const updateStudentPredmets = ()=>{
    predmeti.value = data.value.studentPredmets.filter((sp)=>{//this is broken
        /* if(!(sp.idPredmeta in idZapisniks.value ) || !nepolozeni.value){
            return true
        }else{
            return false
        } */
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
    <Student :student="data"></Student>
    <DodajPredmet :student="data"></DodajPredmet>
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
                <Predmet v-for="zapisnik in data.zapisniks" :predmet="data.studentPredmets.find((sp)=>sp.idPredmeta == zapisnik.idIspitaNavigation.idPredmeta).idPredmetaNavigation" :ocena="zapisnik.ocena"></Predmet>            
            </td>
        </tr>
    </table>
</template>
<style scoped></style>