<script setup>
import { ref, computed, inject } from 'vue';

const props = defineProps(["student"])
const studentId = ref(props.student.idStudenta)
const studentPredmets = ref(props.student.studentPredmets)
const predmeti = inject("predmeti")
console.log(predmeti);
const dostupniPredmeti = computed(()=>{
    let p = ref([])
    predmeti.value.forEach(predmet => {
        if(studentPredmets.value.find((sp)=>{
            sp.idPredmeta == predmet.idPredmeta
        })){
        }else{
            p.value.push(predmet)
        }
    });
    return p
})
const idPredmeta = ref(0)
</script>
<template>
    Izaberi predmet 
     <!-- {{ dostupniPredmeti }} --> 
    <p v-for="predmet in predmeti">{{ predmet }}</p>
    <!-- <select name="" id="" v-model="idPredmeta">
        <option v-for="predmet in dostupniPredmeti" :value="predmet['idPredmeta']">{{ predmet.naziv }}</option>
    </select> -->
</template>
<style scoped></style>