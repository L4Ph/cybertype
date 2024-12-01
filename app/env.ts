declare module "react-router" {
    interface AppLoadContext {
      whatever: string;
    }
  }
  
  export {}; // necessary for TS to treat this as a module