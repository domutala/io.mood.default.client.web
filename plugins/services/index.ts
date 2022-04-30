import { Plugin } from "@nuxt/types";

// declare module "@nuxt/types" {
//   interface Context {
//     $services: {
//       [key: string]: { refresh: () => void };
//     };
//   }
// }

const plugin: Plugin = (context) => {
  context.$services = {};
};

export default plugin;
