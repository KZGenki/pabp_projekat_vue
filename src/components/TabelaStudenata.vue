<script setup>
import TabelaStudenataRow from './TabelaStudenataRow.vue';
const props = defineProps(["studenti"])
const emits = defineEmits(["izmeni", "predmeti"])

</script>
<template>
    <div>
        <table>
            <thead>
                <th>Ime</th>
                <th>Prezime</th>
                <th>Broj indeksa</th>
                <!-- <th>Prosek</th> -->
                <th>Actions</th>
            </thead>
            <tbody>
                <TabelaStudenataRow v-for="student in props.studenti" :data="student"
                    @izmeni="(arg) => emits('izmeni', arg)" @predmeti="(arg) => emits('predmeti', arg)">
                </TabelaStudenataRow>
            </tbody>
        </table>
    </div>
</template>
<style scoped></style>