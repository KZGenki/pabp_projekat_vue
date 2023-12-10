<script setup>
import TabelaStudenataRow from './TabelaStudenataRow.vue';
const props = defineProps(["studenti"])
const emits = defineEmits(["izmeni"])
const Test = (arg)=>{
    emits('izmeni',arg)
    //console.log(arg);
}
</script>
<template>
    <table>
        <thead> <!-- Izmeniti ovo za studente kad proradi API -->
            <th>First Name</th> 
            <th>Last Name</th> 
            <th>Actions</th>
        </thead>
        <tbody>
            <TabelaStudenataRow v-for="student in props.studenti" :data="student" @izmeni="(arg)=>emits('izmeni',arg)"></TabelaStudenataRow>
        </tbody>
    </table>
</template>
<style scoped>
</style>