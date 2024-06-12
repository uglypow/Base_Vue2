<template>
  <div>
    <div v-for="item in items" :key="item" :id="`step-${item}`" :style="styleObject">
    {{ item }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: "BoxMap",
  components: {}
})
export default class BoxMap extends Vue {
  public items = [1, 2, 3, 4, 5, 6];
  public styleObject = {
        border: "1px solid black",
        width: "100px",
        height: "100px",
        borderRadius: "8px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
  }
}
</script>
