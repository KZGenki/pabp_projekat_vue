<script setup>
import Predmet from './Predmet.vue';
import Student from './Student.vue';
import DodajPredmet from './DodajPredmet.vue';
import { ref, watch, inject, computed } from 'vue';
const props = defineProps(["student","predmeti"])
const emits = defineEmits(["nazad","dodaj_predmet","ukloni_predmet","prijavi_predmet"])
/* const idZapisniks = ref({}) */
/* const predmeti = ref([])  */
const predmets = inject("predmeti")
const predmetiStudenta = inject("predmetiStudenta")
const predmetiStudentaPolozeni = inject("predmetiStudentaPolozeni")
const predmetiStudentaNepolozeni = inject("predmetiStudentaNepolozeni")
const prijavaIspita = inject("prijavaIspita")
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
const prijavi = (predmetId, studentId)=>{
    emits("prijavi_predmet", predmetId, studentId)
}
const showZapisniks = ref(false)
</script>
<template>
    <div>
        <knob @click="$emit('nazad')">Nazad</knob>
    <Student :student="props.student" :ocena="predmetiStudentaPolozeni.prosecnaOcena"></Student>
    <DodajPredmet :student="props.student" :slusa="predmetiStudenta" @dodaj="(predmetId, studentId) => {emits('dodaj_predmet', predmetId, studentId)}"></DodajPredmet>
    <table>
        <!-- <label for="zapisnici">Prikazi zapisnike</label><input type="checkbox" id="zapisnici" v-model="showZapisniks"><br>
        <label for="nepolozeni">Prikazi samo nepolozene</label><input type="checkbox" id="nepolozeni" v-model="nepolozeni"> -->
        <tr>
            <td><hr>Prijavljeni predmeti</td>
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
                <Predmet v-for="studentPredmet in predmetiStudenta" :predmet="studentPredmet" @ukloni="ukloni(studentPredmet.idPredmeta, props.student.idStudenta)"></Predmet>
            </td>
            <!-- <td style="vertical-align: top;" v-if="showZapisniks">
                <tr>
                    <th>Naziv predmeta</th>
                    <th>ESPB</th>
                    <th>Status</th>
                    <th>Ocena</th>
                </tr>
                <Predmet v-for="zapisnik in props.student.zapisniks" :predmet="predmets.find((sp)=>sp.idPredmeta == zapisnik.idIspitaNavigation.idPredmeta)" :ocena="zapisnik.ocena"></Predmet>            
            </td> -->
        </tr>
        <tr>
            <td><hr>Prijavi ispite</td>
        </tr>
        <tr>
            <tr>
                <th>Naziv predmeta</th>
                <th>ESPB</th>
                <th>Status</th>
                <th>Akcije</th>
            </tr>
            <Predmet v-for="predmet in predmetiStudentaNepolozeni" :predmet="predmet" @prijavi="prijavi(predmet.idPredmeta, props.student.idStudenta)" :prijava="1"></Predmet>
        </tr>
        <tr>
            <td><hr>Polozeni predmeti</td>
        </tr>
        <tr>
            <tr>
                <th>Naziv predmeta</th>
                <th>ESPB</th>
                <th>Status</th>
                <th>Ocena</th>
            </tr>
            <Predmet v-for="predmet in predmetiStudentaPolozeni.polozeniPredmeti" :predmet="predmet.predmet" :ocena="predmet.ocena" ></Predmet>
        </tr>
    </table>
    </div>
</template>
<style scoped></style>