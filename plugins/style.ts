import { Plugin } from "@nuxt/types";
import { Params } from "~/models/Params";

declare module "@nuxt/types" {
  interface Context {
    $services: {
      [key: string]: {
        load(): void;
        refresh(): void;
        refresh_one(id: string): void;
      };
    };
  }
}

declare module "@nuxt/types" {
  interface Context {
    $style: {
      colors: { [key: string]: string };
      set: (t?: "dark" | "light") => void;
    };
  }
}

const plugin: Plugin = (context) => {
  const setTheme = async (t?: "dark" | "light") => {
    const old = t;
    if (!t) {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        t = "dark";
      } else {
        t = "light";
      }
    }

    let ts = ["255, 255, 255", "13, 17, 23"];
    if (t === "dark") ts = ts.reverse();

    // 242, 242, 242
    const surface = ["246, 248, 250", "22, 27, 34"][t === "dark" ? 1 : 0];

    const bxcolor = ["rgba(100, 100, 111, 0.2)", "rgba(0, 0, 0, 0.69)"][
      t === "dark" ? 1 : 0
    ];

    // primary = 31 111 235
    // const theme = {
    //   light: {
    //     light: "255, 255, 255",
    //     dark: "13, 17, 23",
    //     surface: "242, 242, 242",
    //   },
    //   dark: {
    //     dark: "255, 255, 255",
    //     light: "32, 32, 32",
    //     surface: "28, 28, 28",
    //   },
    // };

    const colors: { [key: string]: string } = {
      primary: ["218, 42, 42", "255, 215, 0", "0, 195, 107", "31, 111, 235"][2],
      danger: "230, 60, 60",
      success: ["23, 201, 100", "44, 135, 44"][1],

      white: "255, 255, 255",
      black: "0, 0, 0",
      surface,

      "shadow-color": bxcolor,

      light: ts[0],
      dark: ts[1],

      // ...theme[t],
    };

    for (const key of Object.keys(colors)) {
      document.documentElement.style.setProperty(`--${key}`, colors[key]);
    }

    await context.store.dispatch("params/setTheme", old);
    context.$style = { colors, set: setTheme };
  };

  let theme: "dark" | "light" | undefined;
  const params = context.store.getters["params/get"] as Params;
  if (params) theme = params.theme;

  setTheme(theme);
};

export default plugin;
