<script setup>
import { onUpdated, ref, watch } from 'vue';

const props = defineProps(["poruka", "type"])
const Poruka = ref(props.poruka)
const visibility = ref(0)
let h
let s
const show = () => {
    s = setInterval(() => {
        if (visibility.value < 1.0) {
            visibility.value += 0.05
        } else {
            clearInterval(s)
        }
    }, 1)
}
const hide = () => {
    h = setInterval(() => {
        if (visibility.value > 0.0) {
            visibility.value -= 0.01
        } else {
            clearInterval(h)
        }
    }, 5)
}
onUpdated(() => {
    if (Poruka.value != props.poruka) {
        Poruka.value = props.poruka
    }
})
watch(Poruka, () => {
    if (Poruka.value != -1) {
        clearInterval(s)
        clearInterval(h)
        show()
        setTimeout(hide, 5000)
    }
})

</script>
<template>
    <div id="message" :class="props.type" :style="{ opacity: visibility }">
        <h3>{{ Poruka }}</h3>
    </div>
</template>
<style scoped>
#message {
    position: fixed;
    bottom: 0%;
    margin: 0 auto;
    border-radius: 50px;
    padding: 0 20px;
    text-align: center;
}

.success {
    background-color: lightgreen;
    color: black
}

.failed {
    background-color: lightcoral;
    color: black
}
</style>