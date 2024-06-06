import { VueConstructor } from 'vue'
import { BaseApplication } from './BaseApplication'

// import { CloudflareDDoSModule } from '@/modules/cloudflareDDoS'
// import { PublicIpModule } from '@/modules/publicIp'

export class Application extends BaseApplication {
  constructor (_Vue: VueConstructor) {
    super(_Vue)
  }
}
