<script setup>
import { ref, computed, inject, onUpdated, watch } from 'vue';

const props = defineProps(["student"])
const emits = defineEmits(["dodaj"])
const studentId = ref(-1)
const studentPredmets = ref([])
const predmeti = inject("predmeti")
const update = ref(false)

/* onUpdated(()=>{
    if(studentId.value != props.student.idStudenta){
        studentId.value = props.student.idStudenta
        studentPredmets.value = props.student.studentPredmets
    }
    if(update.value){
        studentPredmets.value = props.student.studentPredmets
        update.value=false
    }
}) */
/* const updatePredmets = ()=>{
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
} */
/* watch(studentId, updatePredmets)
watch(update, ()=>{
    updatePredmets()
}) */
const dostupniPredmeti = computed(()=>{
    console.log("dostupniPredmeti");
    return predmeti.value.filter((predmet)=>{
        return props.student.studentPredmets.find((p)=>{return p.idPredmeta == predmet.idPredmeta}) === undefined
    })
})
const idPredmeta = ref(-1)
</script>
<template>
    Dodaj novi predmet <br>
     <!-- {{ dostupniPredmeti }}  -->
    <!-- <p v-for="predmet in dostupniPredmeti">{{ predmet.naziv }} {{ predmet.idPredmeta }}</p> -->
    <select name="" id="" v-model="idPredmeta">
        <option v-for="predmet in dostupniPredmeti" :value="predmet.idPredmeta">{{ predmet.naziv }}</option>
    </select>
    <knob @click="()=>{emits('dodaj',idPredmeta, props.student.idStudenta);}" :disabled="idPredmeta==-1?true:false" :boja="'POST'">Dodaj</knob>
</template>
<style scoped></style>