<template>
  <n-dropper ref="dropper" @open="open_date = true" @close="open_date = false">
    <n-input
      slot="button"
      :value="value_formater"
      :error="error"
      :placeholder="placeholder"
      :success="success"
    >
      <slot slot="left" name="left" />

      <div class="input">
        <div>
          {{ value_formater }}
        </div>
      </div>

      <input
        :value="value_formater"
        :required="required"
        readonly
        style="
          width: 100%;
          height: 100%;
          padding: 0;
          border: 0;
          resize: none;
          background: transaprent;
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
          z-index: -1;
        "
      />

      <slot slot="right" name="right" />
    </n-input>
    <div style="width: 350px">
      <n-date-tabler v-if="open_date" :value="value" @input="on_input" />
    </div>
  </n-dropper>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop()
  value!: Date;

  @Prop({ type: Boolean, default: false })
  required!: boolean;

  @Prop({ type: String })
  placeholder!: string;

  @Prop({ type: [String, Boolean], default: false })
  error!: string | boolean;

  @Prop({ type: [String, Boolean], default: false })
  success!: string | boolean;

  open_date = false;

  get value_formater() {
    if (!this.value) return "";

    const v = this.$nuxt.context.$utils.datetime.formater(this.value);
    return v;
  }

  mounted() {
    this.init();
  }

  init() {}

  on_input(value: Date) {
    this.$emit("input", value);

    const dropper = this.$refs.dropper as any;
    dropper.closer();
  }
}
</script>

<style lang="scss" scoped>
svg {
  width: 18px;
}
</style>
