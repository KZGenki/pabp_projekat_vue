<script setup>
import { onMounted, ref } from 'vue';
import TabelaStudenata from './components/TabelaStudenata.vue';
import axios from 'axios'

const Studenti = ref([])

const DohvatiStudente = ()=>{
  axios.get("http://94.156.189.137:8000/api/Employees")
  .then((response)=>{
    Studenti.value = response.data
    console.log(response.data);
  })
  .catch((err)=>{
    console.log("Error ", err);
  })
}
onMounted(()=>{
  DohvatiStudente()
})
const Test = (arg)=>{
    console.log(arg);
}

</script>

<template>
  <h1>Hello world</h1>
  <TabelaStudenata :studenti="Studenti" @izmeni="Test"></TabelaStudenata>
</template>

<style scoped>

</style>
