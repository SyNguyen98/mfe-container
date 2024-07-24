import React from "react";
import { createApp, App } from '@vue/runtime-dom';

const loadVueComponent = async () => {
  const vueApp = await import('mfe_vue/VueComponent');
  return vueApp.default;
};

// React wrapper component for the Vue component
const VueComponentWrapper = () => {
  const ref = React.useRef(null);

  React.useEffect(() => {
    let vueInstance: App<Element> | null = null;

    const mountVueComponent = async () => {
      const VueComponent = await loadVueComponent();
      vueInstance = createApp(VueComponent);
      vueInstance.mount(ref.current!);
    };

    mountVueComponent();

    return () => {
      if (vueInstance) {
        vueInstance.unmount();
      }
    };
  }, []);

  return <div ref={ref}></div>;
};

export default VueComponentWrapper;