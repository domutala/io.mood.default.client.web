import { Middleware } from "@nuxt/types";
import { ISession } from "~/models/Session";

const myMiddleware: Middleware = (context) => {
  if (context.route.name !== "index") {
    const session = context.store.getters["session/get"] as ISession;

    if (!session.uid) {
      return context.redirect({
        name: "index",
        replace: true,
        params: { next: context.route.fullPath },
      });
    }
  }
};

export default myMiddleware;
