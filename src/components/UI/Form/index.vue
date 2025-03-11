<template lang="pug">
    VueFinalModal(
        class="form__container"
    )
        .form__body
            h1(class="form__h1") {{ title }}
            slot
            
</template>

<script lang="ts">
import { VueFinalModal } from 'vue-final-modal'

export default {
    components: {
        VueFinalModal
    },
    props: [
        'title', 'MainContent'
    ],
}
</script>

<style scoped lang="sass">
.form__body
    background-color: white
    position: absolute
    left: 50%
    top: 50%
    transform: translate(-50%, -50%)
    max-width: 800px
    width: 100%
    padding: 4rem
    display: flex
    flex-direction: column
    flex-wrap: nowrap
    .form__h1
        font-size: 2.4rem
        font-weight: 600
        margin: 0rem 0rem 4rem 0rem
</style>






