<template>
  <div v-if="loading" class="loading">
    <n-loader size="36" />
  </div>
  <div v-else-if="ready">
    <nuxt-child />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "nuxt-property-decorator";
import { Getter } from "vuex-class";

import { Params } from "@/models/Params";
import { ISession } from "~/models/Session";
import { User } from "~/models/User";

@Component
export default class extends Vue {
  loading = false;
  ready = false;

  @Getter("get", { namespace: "params" })
  params!: Params;

  @Getter("get", { namespace: "session" })
  session!: ISession;

  mounted() {
    this.reload();

    window.addEventListener("user-updated", async (e: any) => {
      const user: { value: User; format: { [key: string]: any } } = e.detail;
      if (user.value.id === this.session.user?.value.id) {
        await this.$nuxt.context.store.dispatch("session/setUser", user);
      }
    });
  }

  @Watch("$route.name", { deep: true })
  on_route() {
    if (this.$route.name === "index") {
      this.reload();
    }
  }

  reload() {
    this.loading = true;
    this.ready = false;

    this.$nuxt.context.$server
      .request({ url: "/init-session", method: "post" })
      .then(async (data: any) => {
        await this.$nuxt.$store.dispatch("session/setId", data.token);
        await this.$nuxt.$store.dispatch("session/setServerKeys", {
          public: data.public_key,
        });
        await this.$nuxt.context.store.dispatch("session/setUser", data.user);

        this.after_reload();
      })
      .finally(() => {})
      .catch(this.after_reload);
  }

  after_reload() {
    this.loading = false;
    if (!this.session.uid) return;

    this.ready = true;

    if (this.session.user) {
      if (this.$route.name === "index") {
        if (this.$route.query.next) {
          this.$router.replace(this.$route.query.next as string);
        } else {
          this.$router.replace({ name: "index-controle" });
        }
      }
    } else {
      this.$router.replace({
        name: "index-login",
        query: { next: this.$route.query.next },
      });
    }
  }

  setTheme() {
    let theme = this.params.theme;

    if (theme === "dark") theme = "light";
    else if (theme === "light") theme = undefined;
    else theme = "light";

    this.$nuxt.context.$style.set(theme);
  }
}
</script>

<style lang="scss" scoped>
.loading {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
