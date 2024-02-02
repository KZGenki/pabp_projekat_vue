<script setup>
import { ref, computed } from 'vue';

const props = defineProps(["data"])
const emits = defineEmits(["izmeni", "predmeti"])
const p = ref(0)
const prosek = computed(() => {
    p.value = 0
    let count = 0
    if (props.data.zapisniks) {
        if (props.data.zapisniks.length > 0) {
            props.data.zapisniks.forEach(zapisnik => {
                if (zapisnik.ocena > 5) {
                    p.value += zapisnik.ocena
                    count++
                }
            });
            p.value = p.value / count
        }
    }
    return p
})
</script>
<template>
    <tr>
        <td>{{ props.data.ime }}</td>
        <td>{{ props.data.prezime }}</td>
        <!-- <td>{{ props.data.smer }}-{{ props.data.broj }}/{{ props.data.godinaUpisa }}</td> -->
        <td>{{ props.data.brojIndeksa }}</td>
        <!-- <td>{{ parseFloat(prosek.value).toFixed(2) }}</td> -->
        <td>
            <knob @click="emits('izmeni', props.data)" :boja="'PUT'">Izmeni</knob>
            <knob @click="emits('predmeti', props.data)" :boja="'GET'">Predmeti</knob>
        </td>
    </tr>
</template>
<style scoped>
tr:hover {
    background-color: yellow;
    color: black
}
</style>