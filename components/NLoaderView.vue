<template>
  <div class="view-loading">
    <n-loader size="36" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";

@Component
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.view-loading {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
