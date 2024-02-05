<script setup>
const props = defineProps(["predmet","ocena","prijava"])
const emits = defineEmits(["ukloni","prijavi"])
</script>
<template>
    <tr :class="props.ocena==5?'nepolozeno':''">
        <td>{{ props.predmet.naziv }}</td>
        <td style="text-align: center;">{{ props.predmet.espb }}</td>
        <td>{{ props.predmet.status }}</td>
        <td v-if="props.ocena" style="text-align: center;">{{ props.ocena }}</td>
        <td v-if="props.prijava"><knob @click="$emit('prijavi')" :boja="'POST'" :disabled="props.prijava<2">{{ props.prijava<2?"Prijavljen":"Prijava" }}</knob></td>
        <td v-if="!props.ocena && !props.prijava"><knob @click="$emit('ukloni')" :boja="'DELETE'">Ukloni</knob></td>
    </tr>
</template>
<style scoped>
.nepolozeno{
    background-color: darkred;
    color: white;
}
</style>