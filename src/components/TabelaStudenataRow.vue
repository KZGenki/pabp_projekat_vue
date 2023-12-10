<script setup>
const props = defineProps(["data"])
const emits = defineEmits(["izmeni"])
</script>
<template>
    <tr>
        <td>{{ props.data.ime }}</td>
        <td>{{ props.data.prezime }}</td>
        <td>{{ props.data.smer }}-{{ props.data.broj }}/{{ props.data.godinaUpisa }}</td>
        <td><button @click="emits('izmeni', props.data)">Izmeni</button></td>
    </tr>
</template>
<style scoped>
tr:hover{
    background-color: yellow;
    color: black
}
</style>