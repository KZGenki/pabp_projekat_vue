<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import TabelaStudenata from './components/TabelaStudenata.vue';
import Pretraga from './components/Pretraga.vue';
import StudentForma from './components/StudentForma.vue';
import axios from 'axios'

const Studenti = ref([])
const kriterijum = ref("")
const student = ref()
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
const IzmeniStudenta = (arg)=>{
  console.log(arg, student.value);
  if(student.value){
    axios.put(`http://94.156.189.137:8000/api/Employees/${student.value.employeeId}`,{'employeeId':student.value.employeeId, 'firstName':arg.firstName, 'lastName':arg.lastName})
  .then((response)=>{
    console.log(response);
    student.value = null
    DohvatiStudente()
  })
  .catch((err)=>console.log(err))
  }
}
onMounted(() => {
  DohvatiStudente()
})
const Test = (arg) => {
  student.value = arg
  console.log(arg);
}

const filtrirano = computed(() => {
  return Studenti.value.filter((s) => {
    return s.firstName.toLowerCase().includes(kriterijum.value.toLowerCase()) || s.lastName.toLowerCase().includes(kriterijum.value.toLowerCase())
  })
})


</script>

<template>
  <StudentForma :student="student" @sacuvaj="IzmeniStudenta"></StudentForma>
  <Pretraga @pretraga="arg => kriterijum = arg"></Pretraga>
  <TabelaStudenata :studenti="filtrirano" @izmeni="Test"></TabelaStudenata>
</template>

<style scoped></style>
