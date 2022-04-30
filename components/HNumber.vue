<template>
  <div class="widget">
    <n-input :placeholder="placeholder" :value="value">
      <input
        ref="input"
        type="button"
        :required="props.required"
        :min="props.min"
        :max="props.max"
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
  @Prop({ type: Object, default: () => ({}) })
  props!: {
    required?: boolean;
    min: number;
    max: number;
  };

  mounted() {
    this.init();
  }

  init() {}

  on_input() {
    const input = this.$refs.input as HTMLInputElement;
    this.$emit("input", input.value);
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/_variables";

.widget {
  .avatar {
    margin: auto;
    width: 120px;
    height: 120px;
    border-radius: 16em;
    background-color: rgba(var(--dark), 0.07);
    position: relative;
    cursor: pointer;

    > img {
      width: 100%;
      height: 100%;
      border-radius: inherit;
      object-position: center;
      object-fit: cover;
    }

    > .spin {
      width: 24px;
      height: 24px;
      position: absolute;
      background-color: rgba(var(--light), 1);
      border-radius: 16em;
      border: 1px solid rgba(var(--dark), 0.05);
      bottom: 7px;
      right: 7px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
