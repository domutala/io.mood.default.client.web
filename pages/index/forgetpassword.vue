<template>
  <nuxt-child />
</template>

<script lang="ts">
import { Vue, Component, Watch } from "nuxt-property-decorator";

@Component
export default class extends Vue {
  mounted() {
    this.on_route();
  }

  @Watch("$route.name", { deep: true })
  on_route() {
    if (this.$nuxt.context.route.name === "index-forgetpassword") {
      this.$nuxt.context.redirect({ name: "index-forgetpassword-step1" });
    }
  }
}
</script>
