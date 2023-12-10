<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import TabelaStudenata from './components/TabelaStudenata.vue';
import Pretraga from './components/Pretraga.vue';
import axios from 'axios'

const Studenti = ref([])
const kriterijum = ref("")
const DohvatiStudente = () => {
  axios.get("http://94.156.189.137:8000/api/Employees")
    .then((response) => {
      Studenti.value = response.data
      console.log(response.data);
    })
    .catch((err) => {
      console.log("Error ", err);
    })
}
onMounted(() => {
  DohvatiStudente()
})
const Test = (arg) => {
  console.log(arg);
}

const filtrirano = computed(() => {
  return Studenti.value.filter((s) => {
    return s.firstName.toLowerCase().includes(kriterijum.value.toLowerCase()) || s.lastName.toLowerCase().includes(kriterijum.value.toLowerCase())
  })
})

</script>

<template>
  <Pretraga @pretraga="arg => kriterijum = arg"></Pretraga>
  <TabelaStudenata :studenti="filtrirano" @izmeni="Test"></TabelaStudenata>
</template>

<style scoped></style>
