import { Store } from 'vuex'
import VueRouter from 'vue-router'
import _Vue, { VueConstructor } from 'vue'

export abstract class VueModules {
  protected abstract readonly namespace: string

  protected router!: VueRouter
  protected store!: Store<any>

  public abstract install(Vue: typeof _Vue): void
  public resetStore?(): void
}
