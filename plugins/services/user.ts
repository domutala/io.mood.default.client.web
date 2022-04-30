import { Plugin } from "@nuxt/types";

const plugin: Plugin = (context) => {
  window.addEventListener("user-updated", (e: any) => {
    const user = e.detail;
    context.store.dispatch("users/update", user);
  });

  window.addEventListener("user-removed", (e: any) => {
    const id = e.detail;
    context.store.dispatch("users/remove", id);
  });

  window.addEventListener("user-added", (e: any) => {
    const user = e.detail;
    context.store.dispatch("users/update", user);
    context.store.dispatch("users/add", user.value.id);
  });

  context.$services.user = {
    load() {
      context.$server
        .request({ url: "/controle/user/list" })
        .then((data: any) => {
          const ids: string[] = data;
          for (const id of ids) {
            context.store.dispatch("users/add", id);
          }
        });
    },

    refresh() {
      const ids = context.store.getters["users/ids"] as string[];
      for (const id of ids) {
        context.$services.user.refresh_one(id);
      }
    },

    refresh_one(id: string) {
      context.$server
        .request({ url: "/controle/user/get", params: { id } })
        .then((user: any) => {
          if (user) context.store.dispatch("users/update", user);
          else context.store.dispatch("users/remove", id);
        });
    },
  };
};

export default plugin;
