import { IPortalTutorialRenderOptions } from '@/@types/nc-tutorial'
import Vue from 'vue'

export enum PortalTutorialEvent {
  ON_LOAD = 'onload',
  ON_OPEN = 'onopen',
  ON_ERROR = 'onerror',
}

export type Listener = (eventName: string) => void
export type ErrorListener = (error: any) => void

export interface PortalTutorialPluginOptions {
  baseUrl: string;
  enabled?: boolean;
  storage?: string;
}

export class PortalTutorialPlugin {
  private ready: boolean = false
  private _intialize = false
  private listeners: Set<Listener> = new Set()

  constructor(public options: PortalTutorialPluginOptions) {}

  public static install(V: typeof Vue, options: PortalTutorialPluginOptions) {
    if (options.enabled) {
      const tutorial = new PortalTutorialPlugin(options)
      V.prototype.$ncPortalTutorial = tutorial
    }
  }
  public attachScript() {
    return new Promise((resolve, reject) => {
      let script: HTMLScriptElement | null = document.querySelector(
        'script[data-type="portal-tutorial"]'
      )

      if (!script) {
        script = document.createElement('script')
        script.defer = true
        script.type = 'module'
        script.setAttribute('data-type', 'portal-tutorial')

        document.head.appendChild(script)
        script.src = process.env.VUE_APP_NC_TUTORIAL_WIDGET_URL!
        console.log(document.head)

        script.onload = () => {
          this.ready = true
          this.broadcast(PortalTutorialEvent.ON_LOAD)
          resolve(void 0)
        }

        script.onerror = (err) => {
          console.error('Tutorial script error', err)
          this.broadcast(PortalTutorialEvent.ON_ERROR)
          reject(err)
        }
      }
    })
  }

  public isWidgetReady() {
    return this.ready
  }

  public onLoad(listener: VoidFunction) {
    const onloadListener = (eventName: string) => {
      if (eventName === PortalTutorialEvent.ON_LOAD) {
        window.ncPortalTutorial.onLoad(listener)
        this.listeners.delete(onloadListener)
      }
    }
    this.listeners.add(onloadListener)
  }

  public subscribe(listener: Listener) {
    this.listeners.add(listener)
    return () => {
      this.listeners.delete(listener)
    }
  }

  public open() {
    console.log(window.ncPortalTutorial)
    window.ncPortalTutorial.open()
  }

  public render(
    element: string | HTMLElement,
    options: IPortalTutorialRenderOptions
  ) {
    if (!this._intialize) {
      window.ncPortalTutorial.init({
        ...this.options,
        ...options
      })
      this._intialize = true
    }
    window.ncPortalTutorial.render(element, options)
  }

  public destroy() {
    window.ncPortalTutorial.destroy()
    this.listeners = new Set()
  }

  private broadcast(eventName: PortalTutorialEvent) {
    this.listeners.forEach((listener) => {
      listener(eventName)
    })
  }
}

Vue.use(PortalTutorialPlugin, {
  enabled: true,
  baseUrl: process.env.VUE_APP_NC_TUTORIAL_WIDGET_URL,
  storage: true
})
