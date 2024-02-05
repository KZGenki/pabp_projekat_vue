<script setup>
import { computed, onMounted, provide, reactive, ref, watch } from 'vue';
import TabelaStudenata from './components/TabelaStudenata.vue';
import Pretraga from './components/Pretraga.vue';
import StudentForma from './components/StudentForma.vue';
import StudentPredmeti from './components/StudentPredmeti.vue';
import Poruke from './components/Poruke.vue';
import Prijave from './components/Prijave.vue';
import axios from 'axios'

const viser_baza = "http://pabp.viser.edu.rs:8000"
const local_baza = "http://localhost:5103"
const url = local_baza

const students = ref([])
const predmets = ref([])
const predmetsStudenta = ref([])
const predmetsStudentaNepolozeni = ref([])
const predmetsStudentaPolozeni = ref([])
const ispitsZaPredmet = ref([])
const prijavaIspita = ref([])
const prijavaIspitaIspit = ref([])
const studentPredmets = ref([])
const zapisniks = ref([])
const ispits = ref([])
const kriterijum = ref("")
const student = ref()
const studentPredmeti = ref()
const state = ref(0)
const messages = {
  default: {
    msg: "",
    type: "default"
  },
  data_loaded: {
    msg: "Podaci ucitani",
    type: "success"
  },
  student_changes_saved: {
    msg: "Uspesno snimljene izmene",
    type: "success"
  },
  student_loaded: {
    msg: "Ucitan student ",
    type: "success"
  },
  empty_field_not_allowed: {
    msg: "Polje za unos ne sme biti prazno",
    type: "failed"
  },
  error: {
    msg: "Greska: ",
    type: "failed"
  },
  subject_added: {
    msg: "Predmet uspesno dodat",
    type: "success"
  },
  subject_removed: {
    msg: "Predmet uspesno sklonjen",
    type: "success"
  },
  exam_registered:{
    msg: "Ispit uspesno prijavljen",
    type: "success"
  },
  exam_graded:{
    msg: "Ispit uspesno uveden u zapisnik",
    type: "success"
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
  axios.get(url + "/api/Students")
    .then((response) => {
      students.value = response.data
      podaci.students = true
      //console.log(response.data);
    })
    .catch(err => { Notify(messages.error, err) })
}
const IzmeniStudenta = (arg) => {
  if (arg.ime.length == 0 || arg.prezime.length == 0) {
    //Notify( "Polje za unos ne sme biti prazno", "failed")
    Notify(messages.empty_field_not_allowed)
    return
  }
  if (student.value) {
    // let payload = student.value
    // console.log(student.value)
    // console.log(arg)
    // payload.ime = arg.ime
    // payload.prezime = arg.prezime
    let payload = {
      idStudenta: student.value.idStudenta,
      ime: arg.ime,
      prezime: arg.prezime,
      broj: 0,
      smer: "1",
      godinaUpisa: "1"
    }

    //payload.zapisniks = []
    //payload.studentPredmets = []
    console.log(payload)
    axios.put(url + `/api/Students/${arg.idStudenta}`, payload)
      .then((response) => {
        state.value = 0
        student.value = null
        DohvatiStudents()
        Notify(messages.student_changes_saved)
      })
      .catch(err => { Notify(messages.error, err) })
  }
}
const PretraziStudente = (kriterijum) => {
  if (kriterijum.length != 0) {
    axios.get(url + `/api/Students/pretraga/${kriterijum}`)
      .then((response) => {
        students.value = response.data
        podaci.students = true
      })
      .catch(err => { Notify(messages.error, err) })
  }
  else {
    DohvatiStudents()
  }
}
// const DohvatiPredmets = () => {
//   podaci.predmets = false
//   axios.get('http://pabp.viser.edu.rs:8000/api/Predmets')
//     .then((response) => {
//       predmets.value = response.data
//       podaci.predmets = true
//     }).catch(err => { Notify(messages.error, err) })
// }
const DohvatiPredmets = () => {
  podaci.predmets = false
  axios.get(url+`/api/StudentPredmets/predmeti`)
    .then((response) => {
      //console.log(response.data)
      predmets.value = response.data
      podaci.predmets = true
    }).catch(err => { Notify(messages.error, err) })
}
const DohvatiPredmetsStudentaPolozeni = (id)=>{
  axios.get(url+`/api/Zapisniks/Polozeni/${id}`)
    .then((response) => {
      predmetsStudentaPolozeni.value = response.data
    }).catch(err => { Notify(messages.error, err) })
}
const DohvatiPredmetsStudenta = (id)=>{
  axios.get(url+`/api/StudentPredmets/${id}`)
    .then((response) => {
      predmetsStudenta.value = response.data
    }).catch(err => { Notify(messages.error, err) })
}
const DohvatiPredmetsStudentaNepolozeni =  (id)=>{
  axios.get(url+`/api/StudentPredmets/nepolozeni/${id}`)
    .then((response) => {
      predmetsStudentaNepolozeni.value = response.data
    }).catch(err => { Notify(messages.error, err) })
}

const DodajPredmet = (predmetId, studentId) => {
  let payload = {
    idPredmeta: predmetId,
    idStudenta: studentId,
    skolskaGodina: "2022/23",
    idPredmetaNavigation: {},
    idStudentaNavigation: {},
  }
  axios.post(url+'/api/StudentPredmets', payload)
    .then((response) => {
      podaci.studentPredmets = false
      DohvatiPredmetsStudenta(studentId)
      DohvatiPredmetsStudentaPolozeni(studentId)
      DohvatiPredmetsStudentaNepolozeni(studentId)
      DohvatiStudentPredmets()
      Notify(messages.subject_added)


    }).catch(err => { Notify(messages.error, err) })

}
const UkloniPredmet = (predmetId, studentId) => {
  axios.delete(url+`/api/StudentPredmets/${studentId}/${predmetId}`)
    .then((response) => {
      podaci.studentPredmets = false
      DohvatiStudentPredmets()
      DohvatiPredmetsStudenta(studentId)
      DohvatiPredmetsStudentaPolozeni(studentId)
      DohvatiPredmetsStudentaNepolozeni(studentId)
      Notify(messages.subject_removed)
    }).catch(err => { Notify(messages.error, err.response.data); console.log(err) })
}
const DohvatiStudentPredmets = () => {
  podaci.studentPredmets = false
  // axios.get(url+'/api/StudentPredmets')
  //   .then((response) => {
  //     studentPredmets.value = response.data
  //     podaci.studentPredmets = true
  //   }).catch(err => { Notify(messages.error, err)})
}
const DohvatiZapisniks = () => {
  podaci.zapisniks = false
  axios.get(url+'/api/Zapisniks')
    .then((response) => {
      zapisniks.value = response.data
      podaci.zapisniks = true
    }).catch(err => { Notify(messages.error, err) })
}
const DohvatiIspits = () => {
  podaci.ispits = false
  axios.get(url+'/api/Ispits')
    .then((response) => {
      ispits.value = response.data
      podaci.ispits = true
    }).catch(err => { Notify(messages.error, err) })
}
const DohvatiIspitsPredmeta = (idPredmeta)=>{
  axios.get(url+`/api/Ispits/predmet/${idPredmeta}`)
  .then((response)=>{
    ispitsZaPredmet.value = response.data
  }).catch(err => { Notify(messages.error, err) })
}
const PrijaviIspit = (predmetId, studentId)=>{
  let ispit
  axios.get(url+`/api/Ispits/predmet/${predmetId}`)
    .then((response) => {
      console.log(response.data)
      ispit = response.data

      if (ispit.length == 0){
        Notify(messages.error, "Ispit ne postoji za ovaj predmet")
        return
      }
      let payload = {
        idStudenta: studentId,
        idIspita: ispit[0].idIspita
      }
      axios.post(url+`/api/Prijava_brojIndeksa`, payload)
      .then((response) => {
          Notify(messages.exam_registered)
          DohvatiPrijaveStudenta(studentId)
          DohvatiPredmetsStudentaNepolozeni(studentId)

        }).catch(err => { Notify(messages.error, "Ispit vec prijavljen") })
    }).catch(err => { Notify(messages.error, err) })  
}
const DohvatiPrijaveStudenta = (studentId)=>{
  axios.get(url+`/api/Prijava_brojIndeksa/student/${studentId}`)
    .then((response) => {
      prijavaIspita.value = response.data
    }).catch(err => { Notify(messages.error, err) })
}
const DohvatiPrijaveIspita = (ispitId)=>{
  axios.get(url+`/api/Prijava_brojIndeksa/ispit/${ispitId}`)
    .then((response) => {
      prijavaIspitaIspit.value = response.data
    }).catch(err => { Notify(messages.error, err) })
}


onMounted(() => {
  DohvatiStudents()
  DohvatiPredmets()
  DohvatiStudentPredmets()
  DohvatiZapisniks()
  DohvatiIspits()
})
provide("predmeti", predmets)
provide("predmetiStudenta", predmetsStudenta)
provide("predmetiStudentaNepolozeni", predmetsStudentaNepolozeni)
provide("predmetiStudentaPolozeni", predmetsStudentaPolozeni)
provide("prijavaIspita", prijavaIspita)
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
  DohvatiPredmetsStudenta(student.idStudenta)
  DohvatiPredmetsStudentaPolozeni(student.idStudenta)
  DohvatiPredmetsStudentaNepolozeni(student.idStudenta)
  state.value = 2
  studentPredmeti.value = student
  //Notify(messages.student_loaded, `${student.ime} ${student.prezime} ${student.smer}-${student.broj}/${student.godinaUpisa}`)
  Notify(messages.student_loaded, `${student.ime} ${student.prezime} ${student.brojIndeksa}`)
}
const IzabranPredmet = (idPredmeta)=>{
  //console.log("predmet izabran", idPredmeta)
  DohvatiIspitsPredmeta(idPredmeta)
  //console.log(ispitsZaPredmet.value)
}

const IzabranIspit = (idIspita)=>{
  //console.log("ispit izabran",idIspita)
  DohvatiPrijaveIspita(idIspita)
  //console.log(prijavaIspitaIspit.value)
}
const UnesiOcenu = (IspitId, StudentId, unetaOcena)=>{
  console.log("ispit ", IspitId, " student ", StudentId, " ocena ", unetaOcena)
  let payload = {
    idStudenta: StudentId,
    idIspita: IspitId,
    Ocena: unetaOcena,
    Bodovi:""
  }
  axios.post(url+'/api/Zapisniks', payload)
    .then((response) => {
      podaci.zapisniks = false
      DohvatiPredmetsStudenta(StudentId)
      DohvatiPredmetsStudentaPolozeni(StudentId)
      DohvatiPredmetsStudentaNepolozeni(StudentId)
      DohvatiStudentPredmets()
      Notify(messages.exam_graded)
      axios.delete(url+`/api/Prijava_brojIndeksa/${StudentId}/${IspitId}`)
        .then(()=>{
          DohvatiPrijaveStudenta(StudentId)
          DohvatiPrijaveIspita(IspitId)
        }).catch(err => { Notify(messages.error, err) })
    }).catch(err => { Notify(messages.error, err) })
  
}

const Nazad = () => {
  state.value = 0
}

const Notify = (message, arg = null) => {
  Poruka.value = messages.default
  setTimeout(() => { Poruka.value = arg == null ? message : { msg: message.msg + " " + arg, type: message.type } }, 100)
}

</script>

<template>
  <div>
    <a :href="url+'/swagger/index.html'" target="_blank">API</a><br>

    <div v-if="state == 0">
      <Pretraga @pretraga="arg => PretraziStudente(arg)"></Pretraga>
      <TabelaStudenata :studenti="filtrirano" @izmeni="Izmeni" @predmeti="Predmeti"></TabelaStudenata>
    </div>
    <StudentForma v-if="state == 1" :student="student" @sacuvaj="IzmeniStudenta" @nazad="Nazad"></StudentForma>
    <StudentPredmeti v-if="state == 2" :student="studentPredmeti" :predmeti="2" @nazad="Nazad"
      @dodaj_predmet="DodajPredmet" @ukloni_predmet="UkloniPredmet" @prijavi_predmet="PrijaviIspit"></StudentPredmeti>
    <Prijave :predmeti="predmets" :ispiti="ispitsZaPredmet" :prijave="prijavaIspitaIspit" :studenti="students" @izabran_predmet="IzabranPredmet" @izabran_ispit="IzabranIspit" @unesi_ocenu="UnesiOcenu"></Prijave>
  </div>
  <Poruke :poruka="Poruka.msg" :type="Poruka.type"></Poruke>
</template>

<style scoped></style>
