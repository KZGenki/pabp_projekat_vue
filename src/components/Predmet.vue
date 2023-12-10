<script setup>
const props = defineProps(["predmet"])
//console.log(props.predmet);
</script>
<template>
    <tr>
        <td>{{ props.predmet.naziv }}</td>
    </tr>
</template>
<style scoped></style>