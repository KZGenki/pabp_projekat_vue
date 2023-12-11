<script setup>
const props = defineProps(["predmet","ocena"])
</script>
<template>
    <tr :class="props.ocena==5?'nepolozeno':''">
        <td>{{ props.predmet.naziv }}</td>
        <td v-if="props.ocena">{{ props.ocena }}</td>
    </tr>
</template>
<style scoped>
.nepolozeno{
    background-color: darkred;
    color: white;
}
</style>