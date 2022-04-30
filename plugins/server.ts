import { AxiosResponse, AxiosRequestConfig } from "axios";
import { Plugin } from "@nuxt/types";
import { ISession } from "~/models/Session";
import { Unit } from "~/models/Unit";

declare module "@nuxt/types" {
  interface Context {
    $server: {
      base_url: string;
      request: (config?: AxiosRequestConfig) => Promise<AxiosResponse>;
      get_units: ({
        id,
        parent,
        type,
      }?: {
        id?: string;
        parent?: string;
        type?: string[];
      }) => Promise<{ [key: string]: Unit[] }>;
    };
  }
}

const plugin: Plugin = (context) => {
  const base_url = "http://localhost:6051";

  context.$axios.setBaseURL(base_url);

  context.$axios.interceptors.request.use(
    async (config) => {
      config.headers = config.headers || {};
      const session = context.store.getters["session/get"] as ISession;

      const body = config.data;
      config.data = {};

      const params = config.params;
      config.params = {};

      if (!session.keys) {
        session.keys = context.$utils.rsa.generate();
        await context.store.dispatch("session/setKeys", session.keys);
      }

      if (session.server_keys) {
        if (session.uid) {
          const token = context.$utils.rsa.encrypt({
            key: session.server_keys.public,
            data: JSON.parse(JSON.stringify(session.uid)),
          });

          config.headers.token = JSON.stringify(token);
        }

        if (body) {
          if (body instanceof FormData) {
            config.data = body;
          } else {
            config.data.data = context.$utils.rsa.encrypt({
              key: session.server_keys.public,
              data: JSON.stringify(body),
            });
          }
        }

        config.headers.version = context.$utils.rsa.encrypt({
          key: session.server_keys.public,
          data: "0.0.0",
        });

        if (params) {
          for (const key in params) {
            if (Object.prototype.hasOwnProperty.call(params, key)) {
              const k = context.$utils.rsa.encrypt({
                key: session.server_keys.public,
                data: key,
              });

              if (params[key]) {
                const v = context.$utils.rsa.encrypt({
                  key: session.server_keys.public,
                  data: JSON.stringify(params[key]),
                });
                config.params[JSON.stringify(k)] = v;
              }
            }
          }
        }
      }

      if (config.url === "/init-session") {
        config.data.public_key = session.keys.public;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  context.$axios.interceptors.response.use(
    async (response) => {
      if (response && response.data) {
        const session = context.store.getters["session/get"] as ISession;
        if (session.keys) {
          let dt = response.data;
          if (typeof dt === "string") {
            if (dt.split(";;").length) dt = dt.split(";;");
          }

          const body = context.$utils.rsa.decrypt({
            key: session.keys.private,
            data: dt,
          });

          if (body) {
            const data = JSON.parse(body);

            if (data.error) {
              const t1 = ["sessionHaveAlreadyUser", "sessionNotHaveUser"];
              if (t1.includes(data.name)) {
                await context.store.dispatch("session/clean");

                const query =
                  context.route.name && context.route.name !== "index-login"
                    ? { next: context.route.fullPath }
                    : undefined;

                context.redirect({ name: "index", query });
              }

              return Promise.reject(data);
            }

            return JSON.parse(body);
          }
        }
      }

      return null;
    },
    (error) => {
      console.log(404);
      return Promise.reject(error);
    }
  );

  const request = (config: AxiosRequestConfig = {}): Promise<AxiosResponse> => {
    // config.url = `/rest${config.url}`;

    return new Promise((resolve, reject) => {
      if (config.data && config.data.files) {
        const formData = new FormData();
        const files: File[] = config.data.files;

        if (!config.headers) config.headers = {};

        config.headers["Content-Type"] = "multipart/form-data";

        for (const file of files) {
          formData.append("files", file);
        }

        delete config.data.files;

        for (const key of Object.keys(config.data)) {
          formData.append(key, config.data[key]);
        }

        context.$axios
          .post(config.url as string, formData, config)
          .then((response: AxiosResponse) => resolve(response))
          .catch((err) => reject(err));
      } else {
        context.$axios
          .request(config)
          .then((response: AxiosResponse) => resolve(response))
          .catch((err) => reject(err));
      }
    });
  };

  const get_units = ({
    id,
    parent,
    types,
  }: {
    id?: string;
    parent?: string;
    types?: string[];
  } = {}): Promise<{ [key: string]: Unit[] }> => {
    return new Promise((resolve, reject) => {
      context.$server
        .request({
          url: "/unit/get",
          params: { parent, id, types },
        })
        .then((data: any) => {
          const group: { [key: string]: Unit[] } = {};

          for (const unit of data as Unit[]) {
            group[unit.type] = group[unit.type] || [];
            group[unit.type].push(unit);
          }

          resolve(group);
        })
        .catch((e) => {
          reject(e);
        });
    });
  };

  context.$server = { request, get_units, base_url };
};

export default plugin;
