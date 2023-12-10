<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import TabelaStudenata from './components/TabelaStudenata.vue';
import Pretraga from './components/Pretraga.vue';
import StudentForma from './components/StudentForma.vue';
import StudentPredmeti from './components/StudentPredmeti.vue';
import axios from 'axios'

const Studenti = ref([])
const kriterijum = ref("")
const student = ref()

const DohvatiStudente = () => {
  axios.get("http://pabp.viser.edu.rs:8000/api/Students")
    .then((response) => {
      Studenti.value = response.data
      //console.log(response.data);
    })
    .catch((err) => {
      console.log("Error ", err);
    })
}
const IzmeniStudenta = (arg)=>{
  console.log(arg, student.value);
  if(student.value){
    let payload = student.value
    payload.ime = arg.ime
    payload.prezime = arg.prezime
    payload.smer = arg.smer
    payload.broj = arg.broj
    console.log(payload);
    axios.put(`http://pabp.viser.edu.rs:8000/api/Students/${arg.idStudenta}`,payload)
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
const Izmeni = (arg) => {
  student.value = arg
  //console.log(arg);
}

const filtrirano = computed(() => {
  let krit = kriterijum.value.toLowerCase()
  return Studenti.value.filter((s) => {
    return s.ime.toLowerCase().includes(krit) || s.prezime.toLowerCase().includes(krit) || s.smer.toLowerCase().includes(krit) || s.godinaUpisa.toLowerCase().includes(krit)
  })
})

const studentPredmeti = ref()
const Predmeti = (student)=>{
  //console.log(student);
  studentPredmeti.value = student
}

</script>

<template>
  <StudentForma :student="student" @sacuvaj="IzmeniStudenta"></StudentForma>
  <Pretraga @pretraga="arg => kriterijum = arg"></Pretraga>
  <TabelaStudenata :studenti="filtrirano" @izmeni="Izmeni" @predmeti="Predmeti"></TabelaStudenata>
  <StudentPredmeti :student="studentPredmeti"></StudentPredmeti>
</template>

<style scoped></style>
