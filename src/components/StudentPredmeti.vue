<script setup>
import Predmet from './Predmet.vue';
import Student from './Student.vue';
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
    <Student :student="data"></Student>
    <table>
        <tr>
            <td>Prijavljeni predmeti <input type="checkbox" name="" id="" v-model="nepolozeni">{{ nepolozeni }}</td>
            <td>Polozeni predmeti</td>  
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