<script setup>
import { onUpdated, ref, watch } from 'vue';

const props = defineProps(["poruka","type"])
const Poruka = ref(props.poruka)
const visibility = ref(50)
const show = ()=>{
    visibility.value=100
}
const hide = ()=>{
    visibility.value=0
}
onUpdated(()=>{
    if(Poruka.value!=props.poruka){
        Poruka.value = props.poruka
    }
})
watch(Poruka,()=>{
    console.log("watch poruke",visibility);
    show()
    setTimeout(hide,5000)
})

</script>
<template>
    <div id="message" :class="props.type" :style="{opacity:visibility}">
        <h3>{{ Poruka }}</h3>
    </div>
</template>
<style scoped>

#message{
    position: fixed;
    bottom: 0%;
    margin: 0 auto;
    border-radius: 50px;
    padding: 0 20px;
    text-align: center;
}

.success{
    background-color: lightgreen;
    color: black
}

.failed{
    background-color: lightcoral;
    color: black
}



</style>