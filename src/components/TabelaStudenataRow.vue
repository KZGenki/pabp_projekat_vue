<script setup>
const props = defineProps(["data"])
const emits = defineEmits(["izmeni"])
</script>
<template>
    <tr>
        <td>{{ props.data.firstName }}</td>
        <td>{{ props.data.lastName }}</td>
        <td><button @click="emits('izmeni', props.data)">Izmeni</button></td>
    </tr>
</template>
<style scoped></style>