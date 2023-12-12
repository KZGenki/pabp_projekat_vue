<script setup>
import { ref, computed, inject, onUpdated, watch } from 'vue';

const props = defineProps(["student"])
const emits = defineEmits(["dodaj"])
const studentId = ref(-1)
const studentPredmets = ref([])
const predmeti = inject("predmeti")
const dostupniPredmeti = ref([])
const update = ref(false)

onUpdated(()=>{
    if(studentId.value != props.student.idStudenta){
        studentId.value = props.student.idStudenta
        studentPredmets.value = props.student.studentPredmets
    }
    if(update.value){
        studentPredmets.value = props.student.studentPredmets
        update.value=false
    }
})
watch(studentId,()=>{
    dostupniPredmeti.value = []
    for (const predmet of predmeti.value) {       
        let found = false
        for (const sp of studentPredmets.value) {

            if(predmet.idPredmeta == sp.idPredmeta){
                found = true
                break
            }
        }
        if(!found){
            dostupniPredmeti.value.push(predmet)
        }     
    }
})
const idPredmeta = ref(0)
</script>
<template>
    Dodaj novi predmet <br>
     <!-- {{ dostupniPredmeti }}  -->
    <!-- <p v-for="predmet in dostupniPredmeti">{{ predmet.naziv }}</p> -->
    <select name="" id="" v-model="idPredmeta">
        <option v-for="predmet in dostupniPredmeti" :value="predmet.idPredmeta">{{ predmet.naziv }}</option>
    </select>
    <knob @click="()=>{emits('dodaj',idPredmeta, studentId); update=true}" :disabled="idPredmeta==0?true:false" :boja="'POST'">Dodaj</knob>
</template>
<style scoped></style>