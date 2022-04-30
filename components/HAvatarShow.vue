<template>
  <div class="havatar-show">
    <n-img v-if="value && value.value" :src="value.value" />
    <n-img v-else src="/img/avatar.png" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
import { Key } from "~/models/Employee";

@Component
export default class extends Vue {
  @Prop() value!: Key;

  mounted() {}
}
</script>

<style lang="scss" scoped>
@import "~/assets/_variables";

.havatar-show {
  width: 128px;
  height: 128px;
  border-radius: 16em;
  background-color: rgba(var(--dark), 0.07);

  &.sm {
    width: 64px;
    height: 64px;
  }

  &.md {
    width: 86px;
    height: 86px;
  }

  &.xs {
    width: 32px;
    height: 32px;
  }
}
</style>
