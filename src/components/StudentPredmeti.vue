<script setup>
import Predmet from './Predmet.vue';
import Student from './Student.vue';
import DodajPredmet from './DodajPredmet.vue';
import { ref, watch, inject, computed } from 'vue';
const props = defineProps(["student","predmeti"])
const emits = defineEmits(["nazad","dodaj_predmet","ukloni_predmet"])
/* const idZapisniks = ref({}) */
/* const predmeti = ref([])  */
const predmets = inject("predmeti")
const nepolozeni = ref(false)

const idZapisniks = computed(()=>{
    let zaps = []
    props.student.zapisniks.forEach((zapisnik)=>{
        zaps[zapisnik.idIspitaNavigation.idPredmeta] = zapisnik.ocena
    })
    return zaps
})
const predmeti = computed(()=>{
    return props.student.studentPredmets.filter((sp)=>{
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
})

const ukloni = (predmetId, studentId)=>{
    emits("ukloni_predmet", predmetId, studentId)
    
}
const showZapisniks = ref(false)
</script>
<template>
    <div>
        <knob @click="$emit('nazad')">Nazad</knob>
    <Student :student="props.student"></Student>
    <DodajPredmet :student="props.student" @dodaj="(predmetId, studentId) => {emits('dodaj_predmet', predmetId, studentId)}"></DodajPredmet>
    <table>
        <label for="zapisnici">Prikazi zapisnike</label><input type="checkbox" id="zapisnici" v-model="showZapisniks"><br>
        <label for="nepolozeni">Prikazi samo nepolozene</label><input type="checkbox" id="nepolozeni" v-model="nepolozeni">
        <tr>
            <td>Prijavljeni predmeti</td>
            <td v-if="showZapisniks">Zapisnici</td>  
        </tr>
        <tr>
            <td style="vertical-align: top;">
                <tr>
                    <th>Naziv predmeta</th>
                    <th>ESPB</th>
                    <th>Status</th>
                    <th>Akcije</th>
                </tr>
                <Predmet v-for="studentPredmet in predmeti" :predmet="studentPredmet.idPredmetaNavigation" @ukloni="ukloni(studentPredmet.idPredmeta, studentPredmet.idStudenta)"></Predmet>
            </td>
            <td style="vertical-align: top;" v-if="showZapisniks">
                <Predmet v-for="zapisnik in props.student.zapisniks" :predmet="predmets.find((sp)=>sp.idPredmeta == zapisnik.idIspitaNavigation.idPredmeta)" :ocena="zapisnik.ocena"></Predmet>            
            </td>
        </tr>
    </table>
    </div>
</template>
<style scoped></style>