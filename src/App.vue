<template lang="pug">
  nav

  router-view
</template>

<script lang="ts">
export default {
  components: {
  }  
}
</script>



<style lang="sass">
@font-face
    font-family: Montserrat
    src: url('~@/assets/fonts/Montserrat/Montserrat-VariableFont_wght.ttf')

:root
  --main-color: rgba(23, 75, 124, 1)

html
  font-size: 10px
body
  margin: 0
  padding: 0

* 
  box-sizing: border-box;
  font-family: Montserrat, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale


nav
  padding: 3rem
  a
    font-weight: bold
    color: #2c3e50
    font-size: 1rem

    &.router-link-exact-active
      color: #42b983
    
</style>
