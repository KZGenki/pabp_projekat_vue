<script setup>
import { ref, computed } from 'vue';

const props = defineProps(["data"])
const emits = defineEmits(["izmeni","predmeti"])
const p = ref(0)
const prosek = computed(()=>{
    p.value = 0
    if(props.data.zapisniks.length>0){
        console.log("prosek");
        props.data.zapisniks.forEach(zapisnik => {
            p.value+=zapisnik.ocena
        });
        console.log("suma ocena", p.value);
        p.value = p.value/props.data.zapisniks.length
    }
    return p 
})
</script>
<template>
    <tr>
        <td>{{ props.data.ime }}</td>
        <td>{{ props.data.prezime }}</td>
        <td>{{ props.data.smer }}-{{ props.data.broj }}/{{ props.data.godinaUpisa }}</td>
        <td>{{ parseFloat(prosek.value).toFixed(2) }}</td>
        <td>
            <button @click="emits('izmeni', props.data)">Izmeni</button>
            <button @click="emits('predmeti', props.data)">Predmeti</button>
        </td>
    </tr>
</template>
<style scoped>
tr:hover{
    background-color: yellow;
    color: black
}
</style>