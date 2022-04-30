export const strict = process.env.NODE_ENV !== "production";

export const state = () => ({
  version: "1.0.0",
});

export const plugins = [
  (store: any) => {
    const old = localStorage.getItem("cookies");
    if (old) store.replaceState(JSON.parse(old));

    store.subscribe((_mutation: any, state: any) => {
      localStorage.setItem("cookies", JSON.stringify(state));
    });
  },
];
