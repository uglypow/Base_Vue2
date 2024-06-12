<template>
  <div>
    <v-btn color="primary" @click="showModal = true">Open Modal</v-btn>
    <v-dialog persistent v-model="showModal" @keydown.esc="closeModal">
      <v-card>
        <v-card-title class="pt-3 pb-0">
          <v-layout row wrap>
            <v-flex xs12>
              <slot name="title">
                <h3>Modal Title</h3>
              </slot>
            </v-flex>
          </v-layout>
        </v-card-title>
        <v-card-text class="px-4 pt-0">
          <slot name="body">
            <p>Modal body content goes here.</p>
          </slot>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <slot name="action">
            <v-btn color="primary" text @click="showModal = false">Close</v-btn>
          </slot>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'Modal'
})
export default class Modal extends Vue {
  showModal = false

  closeModal() {
    this.showModal = false
  }
}
</script>