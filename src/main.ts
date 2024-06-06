import 'reflect-metadata'

import Vue from 'vue'
import App from './app/App.vue'
import { Application } from './app/Application'
import './plugins/PortalTutorial'

const app = new Application(Vue)

app.createVue({
  render: (h) => h(App)
})

