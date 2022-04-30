<template>
  <div class="widget">
    <n-input :value="value">
      <div class="input">
        {{ placeholder }}
      </div>
      <div slot="right">
        <n-switch :required="props.required" :value="value" @input="on_input" />
      </div>
    </n-input>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";

@Component
export default class extends Vue {
  @Prop() value!: any;

  @Prop({ type: String }) placeholder!: string;
  @Prop({ type: Object, default: () => ({}) }) props!: { required?: boolean };

  mounted() {}

  on_input(value: boolean) {
    this.$emit("input", value);
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/_variables";
</style>
