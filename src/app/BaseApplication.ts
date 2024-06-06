import { VueModules } from '@/VueModules'
import Vue, { ComponentOptions, VueConstructor } from 'vue'
import VueRouter from 'vue-router'
import { Store } from 'vuex'

export abstract class BaseApplication {
  // eslint-disable-next-line @typescript-eslint/array-type
  private modules: Array<
    new (router: VueRouter, store: Store<any>) => VueModules
  > = []

  private moduleRegistered: VueModules[] = []

  public _Vue!: VueConstructor

  public createVue (vueOptions?: ComponentOptions<Vue>) {
    new this._Vue(vueOptions).$mount('#app')
  }

  constructor (_Vue: VueConstructor) {
    this._Vue = _Vue
  }

  public useModule<T extends Function> (_module: T) {
    this.modules.push((_module as unknown) as new (...args: any[]) => any)
  }

  public initialModules (vueRouter: VueRouter, vuexStore: Store<any>) {
    this.moduleRegistered = this.modules.map(_Module => {
      const _module = new _Module(vueRouter, vuexStore)
      _module.install(this._Vue)
      return _module
    })
    this.modules = []
  }

  public bootstrap (
    options: {
      router: VueRouter
      store: Store<any>
    },
    bootstrapedFn?: (_Vue: VueConstructor) => void
  ) {
    this.initialModules(options.router, options.store)
    bootstrapedFn && bootstrapedFn!(this._Vue)
  }

  public resetAllModuleStore () {
    this.moduleRegistered.forEach(_module => {
      _module.resetStore?.()
    })
  }
}
