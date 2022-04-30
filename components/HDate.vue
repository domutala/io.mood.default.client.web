<template>
  <n-date
    :value="value"
    :required="props.required"
    :placeholder="placeholder"
    @input="on_input"
  >
    <div slot="left">
      <i class="fi fi-sr-calendar"></i>
    </div>
  </n-date>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop() value!: Date;
  @Prop({ type: String }) placeholder!: string;
  @Prop({ type: Object, default: () => ({}) }) props!: { required?: boolean };

  get value_formater() {
    if (!this.value) return "";

    const v = this.$nuxt.context.$utils.datetime.formater(this.value);
    return v;
  }

  mounted() {}

  on_input(value: Date) {
    console.log(value);

    this.$emit("input", value);
  }
}
</script>
