import { ErrorListener, Listener, PortalTutorialPlugin } from '../plugins/PortalTutorial'

declare module 'vue/types/vue' {
  interface Vue {
    $ncPortalTutorial?: portalTutorial;
  }
}

declare type portalTutorial = PortalTutorialPlugin

declare interface IPortalTutorialInitOptions {
  baseUrl: string;
  position?: {
    top?: number;
    left?: number;
    bottom?: number;
    right?: number;
  };
}

export interface IPortalTutorialRenderOptions {
  storage?: boolean;
  onError?: ErrorListener;
  position?: {
    top?: number;
    left?: number;
    bottom?: number;
    right?: number;
  };
}

declare global {
  interface Window {
    ncPortalTutorial: {
      onLoad: (listener: VoidFunction) => void;
      init: (options: IPortalTutorialInitOptions) => void;
      render(
        element: string | HTMLElement,
        options: IPortalTutorialRenderOptions
      ): void;
      open(): void;
      destroy(): void;
      deleteListener: (listener: Listener) => void;
    };
  }
}

export { }

