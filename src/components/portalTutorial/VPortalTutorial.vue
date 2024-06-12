<template>
  <div
    id="nc-tutorial-widget"
    ref="tutorial-widget"
  />
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'vue-property-decorator'

@Component({
  name: 'VPortalTutorial',
  components: {}
})
export default class VPortalTutorial extends Vue {
  @Ref('tutorial-widget')
  private portalTutorialComponent!: HTMLElement

  public async created() {
    await this.$ncPortalTutorial?.attachScript()
  }

  public mounted() {
    this.$ncPortalTutorial?.onLoad(() => {
      this.$ncPortalTutorial?.render(this.portalTutorialComponent, {})
      this.$ncPortalTutorial?.open()
    })
  }

  public destroyed() {
    this.remove()
  }

  public openFeedbackWidget() {
    this.$ncPortalTutorial?.open()
  }

  public remove() {
    this.$ncPortalTutorial?.destroy()
  }
}
</script>