<script setup>
    const props = defineProps(["student"])
</script>
<template>
    <table>
        <h2>Student</h2>
        <tr>
            <td>Ime</td>
            <td>{{ props.student.ime }}</td>
        </tr>
        <tr>
            <td>Prezime</td>
            <td>{{ props.student.prezime }}</td>
        </tr>
        <tr>
            <td>Indeks</td>
            <td>{{ props.student.smer }}-{{ props.student.broj }}/{{ props.student.godinaUpisa }}</td>
        </tr>
    </table>
</template>
<style scoped></style>