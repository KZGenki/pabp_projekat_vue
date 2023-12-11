<script setup>
const props = defineProps(["predmet","ocena"])
//console.log(props.predmet);
</script>
<template>
    <tr>
        <td>{{ props.predmet.naziv }}</td>
        <td v-if="props.ocena">{{ props.ocena }}</td>
    </tr>
</template>
<style scoped></style>