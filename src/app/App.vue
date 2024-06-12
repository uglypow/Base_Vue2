<template>
  <v-app>
    <header>
      <div>
        <BoxMap />
        <Modal />
      </div>
      <VPortalTutorial />
    </header>
  </v-app>
</template>

<script>
import BoxMap from '@/components/portalTutorial/BoxMap.vue';
import VPortalTutorial from '@/components/portalTutorial/VPortalTutorial.vue';
import Modal from '@/components/portalTutorial/Modal.vue'

export default {
  name: 'App',
  components: {
    VPortalTutorial,
    BoxMap,
    Modal
  }
}
</script>

<style scoped></style>
