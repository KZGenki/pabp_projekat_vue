<script setup>
const props = defineProps({"args":Array,"boja":String})
const emits = defineEmits(["click"])
</script>
<template>
    <button @click="$emit('click',args)" :class="props.boja"><slot></slot></button>
</template>
<style scoped>
.GET{
    background-color: lightgreen;
}
.POST{
    background-color: lightblue;
}
.PUT{
    background-color: lightsalmon;
}
.DELETE{
    background-color: lightcoral;
}
</style>