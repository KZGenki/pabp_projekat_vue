<script setup>
import { computed, onMounted, provide, reactive, ref, watch } from 'vue';
import TabelaStudenata from './components/TabelaStudenata.vue';
import Pretraga from './components/Pretraga.vue';
import StudentForma from './components/StudentForma.vue';
import StudentPredmeti from './components/StudentPredmeti.vue';
import Poruke from './components/Poruke.vue';
import axios from 'axios'

const students = ref([])
const predmets = ref([])
const studentPredmets = ref([])
const zapisniks = ref([])
const ispits = ref([])
const kriterijum = ref("")
const student = ref()
const studentPredmeti = ref()
const state = ref(0)
const messages = {
  default:{
    msg:"",
    type:"default"
  },
  data_loaded:{
    msg:"Podaci ucitani",
    type:"success"
  },
  student_changes_saved:{
    msg:"Uspesno snimljene izmene",
    type:"success"
  },
  student_loaded:{
    msg:"Ucitan student ",
    type:"success"
  },
  empty_field_not_allowed:{
    msg:"Polje za unos ne sme biti prazno",
    type:"failed"
  },
  error:{
    msg:"Greska: ",
    type:"failed"
  },
  subject_added:{
    msg:"Predmet uspesno dodat",
    type:"success"
  },
  subject_removed:{
    msg:"Predmet uspesno sklonjen",
    type:"success"
  }
}

const Poruka = ref(messages.default)
let podaci = reactive({
  students: false,
  predmets: false,
  zapisniks: false,
  studentPredmets: false,
  ispits: false
})

const DohvatiStudents = () => {
  podaci.students = false
  axios.get("http://pabp.viser.edu.rs:8000/api/Students")
    .then((response) => {
      students.value = response.data
      podaci.students = true
      //console.log(response.data);
    })
    .catch(err => {  Notify( messages.error, err) })
}
const IzmeniStudenta = (arg) => {
  if(arg.ime.length==0 || arg.prezime.length==0 || arg.smer.length==0 || arg.broj.length==0){
      //Notify( "Polje za unos ne sme biti prazno", "failed")
      Notify(messages.empty_field_not_allowed)
      return
    }
  if (student.value) {
    let payload = student.value
    payload.ime = arg.ime
    payload.prezime = arg.prezime
    payload.smer = arg.smer
    payload.broj = arg.broj
    payload.zapisniks = []
    payload.studentPredmets = []
    axios.put(`http://pabp.viser.edu.rs:8000/api/Students/${arg.idStudenta}`, payload)
      .then((response) => {
        state.value = 0
        student.value = null
        DohvatiStudents()
        Notify(messages.student_changes_saved)
      })
      .catch(err => {  Notify( messages.error, err) })
  }
}
const DohvatiPredmets = () => {
  podaci.predmets = false
  axios.get('http://pabp.viser.edu.rs:8000/api/Predmets')
    .then((response) => {
      predmets.value = response.data
      podaci.predmets = true
    }).catch(err => {  Notify( messages.error, err)})
}
const DodajPredmet = (predmetId, studentId) => {
  let payload = {
    idPredmeta: predmetId,
    idStudenta: studentId,
    skolskaGodina: "2022/23",
    idPredmetaNavigation: null,
    idStudentaNavigation: null
  }
  axios.post('http://pabp.viser.edu.rs:8000/api/StudentPredmets', payload)
    .then((response) => {
      podaci.studentPredmets = false
      DohvatiStudentPredmets()
      Notify(messages.subject_added)


    }).catch(err => {  Notify( messages.error, err) })

}
const UkloniPredmet = (predmetId, studentId) => {
  axios.delete(`http://pabp.viser.edu.rs:8000/api/StudentPredmets/${studentId}/${predmetId}`)
    .then((response) => {
      podaci.studentPredmets = false
      DohvatiStudentPredmets()
      Notify(messages.subject_removed)
    }).catch(err => {  Notify( err, "failed") })
}
const DohvatiStudentPredmets = () => {
  podaci.studentPredmets = false
  axios.get('http://pabp.viser.edu.rs:8000/api/StudentPredmets')
    .then((response) => {
      studentPredmets.value = response.data
      podaci.studentPredmets = true
    }).catch(err => {  Notify( messages.error, err) })
}
const DohvatiZapisniks = () => {
  podaci.zapisniks = false
  axios.get('http://pabp.viser.edu.rs:8000/api/Zapisniks')
    .then((response) => {
      zapisniks.value = response.data
      podaci.zapisniks = true
    }).catch(err => {  Notify( messages.error, err) })
}
const DohvatiIspits = () => {
  podaci.ispits = false
  axios.get('http://pabp.viser.edu.rs:8000/api/Ispits')
    .then((response) => {
      ispits.value = response.data
      podaci.ispits = true
    }).catch(err => { Notify( messages.error, err) })
}

onMounted(() => {
  DohvatiStudents()
  DohvatiPredmets()
  DohvatiStudentPredmets()
  DohvatiZapisniks()
  DohvatiIspits()
})
provide("predmeti", predmets)
watch(podaci, () => {
  if (podaci.students && podaci.predmets && podaci.zapisniks && podaci.studentPredmets && podaci.ispits) {
    students.value.forEach((student) => {
      student.studentPredmets = studentPredmets.value.filter((sp) => sp.idStudenta == student.idStudenta)
      student.studentPredmets.forEach((studentPredmet) => {
        studentPredmet.idPredmetaNavigation = predmets.value.filter((p) => p.idPredmeta == studentPredmet.idPredmeta)[0]
      })
      student.zapisniks = zapisniks.value.filter((z) => z.idStudenta == student.idStudenta)
      student.zapisniks.forEach((zapisnik) => {
        zapisnik.idIspitaNavigation = ispits.value.filter((i) => i.idIspita == zapisnik.idIspita)[0]
      })
    })
  }
})

const filtrirano = computed(() => {
  let krit = kriterijum.value.toLowerCase()
  return students.value.filter((s) => {
    return s.ime.toLowerCase().includes(krit) || s.prezime.toLowerCase().includes(krit) || s.smer.toLowerCase().includes(krit) || s.godinaUpisa.toLowerCase().includes(krit)
  })
})

const Izmeni = (arg) => {
  student.value = arg
  state.value = 1
}

const Predmeti = (student) => {
  state.value = 2
  studentPredmeti.value = student
  Notify(messages.student_loaded, `${student.ime} ${student.prezime} ${student.smer}-${student.broj}/${student.godinaUpisa}`)
}

const Nazad = () => {
  state.value = 0
}

const Notify = (message, arg=null)=>{
  Poruka.value = messages.default
  setTimeout(()=>{Poruka.value = arg==null?message:{msg:message.msg +" " + arg, type:message.type}},100)
}

</script>

<template>
  <div>
    <a href="http://pabp.viser.edu.rs:8000/swagger/index.html" target="_blank">API</a><br>

    <div v-if="state == 0">
      <Pretraga @pretraga="arg => kriterijum = arg"></Pretraga>
      <TabelaStudenata :studenti="filtrirano" @izmeni="Izmeni" @predmeti="Predmeti"></TabelaStudenata>
    </div>
    <StudentForma v-if="state == 1" :student="student" @sacuvaj="IzmeniStudenta" @nazad="Nazad"></StudentForma>
    <StudentPredmeti v-if="state == 2" :student="studentPredmeti" :predmeti="2" @nazad="Nazad" @dodaj_predmet="DodajPredmet"
      @ukloni_predmet="UkloniPredmet"></StudentPredmeti>
  </div>
  <Poruke :poruka="Poruka.msg" :type="Poruka.type"></Poruke>
</template>

<style scoped></style>
