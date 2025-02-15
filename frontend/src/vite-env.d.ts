/// <reference types="vite/client" />
declare namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_STABLE_DIFFUSION_API_KEY: string;
    }
  }
  
  declare var process: {
    env: NodeJS.ProcessEnv;
  };