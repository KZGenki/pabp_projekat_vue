<script setup>
const props = defineProps(["predmet","ocena"])
const emits = defineEmits(["ukloni"])
</script>
<template>
    <tr :class="props.ocena==5?'nepolozeno':''">
        <td>{{ props.predmet.naziv }}</td>
        <td v-if="props.ocena">{{ props.ocena }}</td>
        <td v-else><knob @click="$emit('ukloni')" :boja="'DELETE'">Ukloni</knob></td>
    </tr>
</template>
<style scoped>
.nepolozeno{
    background-color: darkred;
    color: white;
}
</style>