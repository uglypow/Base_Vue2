<template>
  <v-app>
    <header>
      <div id="hello">Hello</div>
      <VPortalTutorial />
    </header>
  </v-app>
</template>

<script>
import VPortalTutorial from '@/components/portalTutorial/VPortalTutorial.vue'
export default {
  name: 'App',
  components: {
    VPortalTutorial
  }
}
</script>

<style scoped>
</style>

