<script setup>
import {ref, computed} from 'vue'
const props = defineProps(["predmeti", "ispiti","studenti","prijave"])
const emits = defineEmits(["izabran_predmet","izabran_ispit"])
console.log(props)
const idPredmeta = ref(-1)
const idIspita = ref(-1)
const studentiPrijave = computed(()=>{
    //console.log(props.studenti, props.prijave)
    return props.studenti.filter((s)=>{
        let bool = false
        props.prijave.forEach(element => {   
            console.log(element.idStudenta, s.idStudenta)
            if(element.idStudenta == s.idStudenta){ bool = true }
        });  
        return bool     
    })
})
</script>
<template>
    <hr>
    <div>
        Predmet <br>
        <select name="" id="" v-model="idPredmeta">
            <option v-for="predmet in predmeti" :value="predmet.idPredmeta">{{ predmet.naziv }}</option>
        </select>
        <knob @click="()=>{emits('izabran_predmet', idPredmeta)}" :boja="'GET'" :disabled="idPredmeta==-1">Izaberi</knob>
    </div>
    <div>
        Ispit <br>
        <select name="" id="" v-model="idIspita">
            <option v-for="ispit in ispiti" :value="ispit.idIspita">{{ ispit.datum }}</option>
        </select>
        <knob @click="()=>{emits('izabran_ispit', idIspita)}" :boja="'GET'" :disabled="idIspita==-1">Izaberi</knob>
    </div>
    <div>
        <table>
            <tr v-for="student in studentiPrijave">
                <td>{{ student.ime }}</td>
                <td>{{ student.prezime }}</td>
                <td>{{ student.brojIndeksa }}</td>                
            </tr>
        </table>
    </div>

</template>
<style scoped></style>