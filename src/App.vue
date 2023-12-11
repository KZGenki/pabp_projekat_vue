<script setup>
import { computed, onMounted, provide, reactive, ref, watch } from 'vue';
import TabelaStudenata from './components/TabelaStudenata.vue';
import Pretraga from './components/Pretraga.vue';
import StudentForma from './components/StudentForma.vue';
import StudentPredmeti from './components/StudentPredmeti.vue';
import axios from 'axios'

const students = ref([])
const predmets = ref([])
const studentPredmets = ref([])
const zapisniks = ref([])
const ispits = ref([])
const kriterijum = ref("")
const student = ref()
let podaci = reactive({
  students:false,
  predmets:false,
  zapisniks:false,
  studentPredmets:false,
  ispits:false
})

const DohvatiStudents = () => {
  podaci.students = false
  axios.get("http://pabp.viser.edu.rs:8000/api/Students")
    .then((response) => {
      students.value = response.data
      podaci.students = true
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
    payload.zapisniks = []
    payload.studentPredmets = []
    console.log(payload);
    axios.put(`http://pabp.viser.edu.rs:8000/api/Students/${arg.idStudenta}`,payload)
  .then((response)=>{
    state.value=0
    console.log(response);
    student.value = null
    DohvatiStudents()
  })
  .catch((err)=>console.log(err))
  }
}
const DohvatiPredmets = ()=>{
    podaci.predmets = false
    axios.get('http://pabp.viser.edu.rs:8000/api/Predmets')
    .then((response)=>{
        predmets.value = response.data
        podaci.predmets = true
    }).catch(err=>alert(err))
}
const DodajPredmet = (predmetId, studentId)=>{
  console.log("Predmet ID", predmetId, "Student ID", studentId);
  console.log(studentPredmets.value)
  let payload = {
    idPredmeta: predmetId,
    idStudenta: studentId,
    skolskaGodina: "2022/23",
    idPredmetaNavigation: null,
    idStudentaNavigation: null
  }
  axios.post('http://pabp.viser.edu.rs:8000/api/StudentPredmets',payload)
  .then((response)=>{
    podaci.studentPredmets = false
    DohvatiStudentPredmets()
  }).catch(err=>alert(err))

}
const DohvatiStudentPredmets = ()=>{
    podaci.studentPredmets = false
    axios.get('http://pabp.viser.edu.rs:8000/api/StudentPredmets')
    .then((response)=>{
        studentPredmets.value = response.data
        podaci.studentPredmets = true
    }).catch(err=>alert(err))
}
const DohvatiZapisniks = ()=>{
    podaci.zapisniks = false
    axios.get('http://pabp.viser.edu.rs:8000/api/Zapisniks')
    .then((response)=>{
        zapisniks.value = response.data
        podaci.zapisniks = true
    }).catch(err=>alert(err))
}
const DohvatiIspits = ()=>{
    podaci.ispits = false
    axios.get('http://pabp.viser.edu.rs:8000/api/Ispits')
    .then((response)=>{
        ispits.value = response.data
        podaci.ispits = true
    }).catch(err=>alert(err))
}

onMounted(() => {
  DohvatiStudents()
  DohvatiPredmets()
  DohvatiStudentPredmets()
  DohvatiZapisniks()
  DohvatiIspits()
})
provide("predmeti",predmets)
watch(podaci,()=>{
  //console.log(podaci);
  if(podaci.students && podaci.predmets && podaci.zapisniks && podaci.studentPredmets && podaci.ispits){
    students.value.forEach((student)=> {
      student.studentPredmets = studentPredmets.value.filter((sp)=>sp.idStudenta == student.idStudenta)
      student.studentPredmets.forEach((studentPredmet)=>{
        studentPredmet.idPredmetaNavigation = predmets.value.filter((p)=>p.idPredmeta == studentPredmet.idPredmeta)[0]
      })
      student.zapisniks = zapisniks.value.filter((z)=>z.idStudenta == student.idStudenta)
      student.zapisniks.forEach((zapisnik)=>{
        zapisnik.idIspitaNavigation = ispits.value.filter((i)=>i.idIspita == zapisnik.idIspita)[0]
      })
    })
    //console.log(students.value);
  }
})
const Izmeni = (arg) => {
  student.value = arg
  state.value = 1
  console.log(arg);
}

const filtrirano = computed(() => {
  let krit = kriterijum.value.toLowerCase()
  return students.value.filter((s) => {
    return s.ime.toLowerCase().includes(krit) || s.prezime.toLowerCase().includes(krit) || s.smer.toLowerCase().includes(krit) || s.godinaUpisa.toLowerCase().includes(krit)
  })
})

const studentPredmeti = ref()
const Predmeti = (student)=>{
  //console.log(student);
  state.value=2
  studentPredmeti.value = student
}
//console.log(filtrirano);
const state = ref(0)
const Nazad = ()=>{
  state.value = 0
}
</script>

<template>
  <a href="http://pabp.viser.edu.rs:8000/swagger/index.html" target="_blank">API</a><br>
  <StudentForma :student="student" @sacuvaj="IzmeniStudenta" @nazad="Nazad"></StudentForma>
  <Pretraga @pretraga="arg => kriterijum = arg"></Pretraga>
  <TabelaStudenata :studenti="filtrirano" @izmeni="Izmeni" @predmeti="Predmeti"></TabelaStudenata>
  <StudentPredmeti :student="studentPredmeti" @nazad="Nazad" @dodaj_predmet="DodajPredmet"></StudentPredmeti>
</template>

<style scoped></style>
