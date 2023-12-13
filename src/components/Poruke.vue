<script setup>
import { onUpdated, ref, watch } from 'vue';

const props = defineProps(["poruka", "type"])
const Poruka = ref(props.poruka)
const classes = ref("default")
/* const visibility = ref(0)
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

watch(Poruka, () => {
    if (Poruka.value != -1) {
        clearInterval()
        show()
        setTimeout(hide, 5000)
    }
}) */
onUpdated(() => {
    if (Poruka.value != props.poruka) {
        Poruka.value = props.poruka
        if (Poruka.value != "") {
            clearTimeout()
            classes.value = props.type + " show"
            setTimeout(() => { classes.value = props.type + " hide" }, 5000)
        }
    }
})
/* watch(Poruka, () => {
    if (Poruka.value != "") {
        classes.value = props.type + " show"
        setTimeout(() => { classes.value = props.type + " hide" }, 5000)
    }
}) */

</script>
<template>
    <div id="message" :class="classes">
        <h3>{{ Poruka }}</h3>
    </div>
    <!-- <div id="message" :class="props.type" :style="{ opacity: visibility }">
        <h3>{{ Poruka }}</h3>
    </div> -->
</template>
<style scoped>
@keyframes hide {
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
    }
}

@keyframes show {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

#message {
    position: fixed;
    bottom: 0%;
    margin: 0 auto;
    border-radius: 50px;
    padding: 0 20px;
    text-align: center;
}

.show {
    animation-name: show;
    animation-duration: 0.2s;
    opacity: 1;
}

.hide {
    animation-name: hide;
    animation-duration: 3s;
    opacity: 0;
}

.success {
    background-color: lightgreen;
    color: black
}

.failed {
    background-color: lightcoral;
    color: black
}

.default {
    background-color: transparent;
    color: transparent
}</style>