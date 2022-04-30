<template>
  <div>
    <w-menu />
    <div class="body">
      <nuxt-child />
    </div>

    <w-user-list v-if="open_users" @close="open_users = false" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "nuxt-property-decorator";

@Component({
  middleware: [
    ({ store, redirect }) => {
      const session = store.getters["session/get"];
      if (!session.user) {
        return redirect({ name: "index", replace: true });
      }
    },
  ],
})
export default class extends Vue {
  open_users = false;

  mounted() {
    this.load();

    window.addEventListener("open-user", () => {
      this.open_users = true;
    });
    this.on_route();
  }

  load() {
    this.$nuxt.context.$services.user.load();
  }

  @Watch("$route.name", { deep: true })
  on_route() {
    // if (this.$nuxt.context.route.name === "controle") {
    //   this.$router.push({ name: "controle-admin", replace: true });
    // }
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/_variables";

.body {
  margin-left: $menu-width;

  @media (max-width: 772px) {
    margin-left: 0;
    margin-bottom: calc($menu-width + 20px);
  }
}
</style>
