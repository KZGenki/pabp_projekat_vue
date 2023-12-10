<script setup>
import { onUpdated, ref, watch } from 'vue';
const props = defineProps(["student"])
const emits = defineEmits(["sacuvaj"])
const data = ref()
const ime = ref("")
const prezime = ref("")
watch(data,()=>{
    if(data.value){
        ime.value = data.value.firstName
        prezime.value = data.value.lastName
    }
    else{
        ime.value=""
        prezime.value=""
    }
})
onUpdated(()=>{
    data.value = props.student

})
</script>
<template>
    <table>
        <tr>
            <td>Ime: </td>
            <td><input type="text" v-model="ime"></td>
        </tr>
        <tr>
            <td>Prezime: </td>
            <td><input type="text" v-model="prezime"></td>
        </tr>
        <tr><td colspan="2"><button style="width:100%" @click="$emit('sacuvaj',{firstName:ime,lastName:prezime})">Sacuvaj</button></td></tr>
    </table>
</template>
<style scoped></style>