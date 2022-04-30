<template>
  <div class="widget">
    <n-input :placeholder="placeholder" :value="value">
      <div slot="left">
        <i class="fi fi-sr-at"></i>
      </div>
      <input
        ref="input"
        type="email"
        :required="props.required"
        @input="on_input"
      />
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

  on_input(val: string) {
    this.$emit("input", val);
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/_variables";
svg {
  width: 18px;
}
</style>
