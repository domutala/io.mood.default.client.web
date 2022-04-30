<template>
  <div class="text">
    <div
      ref="textarea"
      class="textarea"
      :contenteditable="!readonly"
      @input="on_input"
    ></div>
    <textarea
      ref="input"
      type="text"
      :required="required"
      readonly
      style="
        width: 100%;
        height: 100%;
        padding: 0;
        border: 0;
        resize: none;
        background: green;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        z-index: -1;
      "
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop({ type: String })
  value!: string;

  @Prop({ type: Boolean, default: false })
  required!: boolean;

  @Prop({ type: Boolean, default: false })
  readonly!: boolean;

  mounted() {
    this.init();
  }

  init() {
    this.on_value();
  }

  @Watch("value")
  on_value() {
    const textarea = this.$refs.textarea as HTMLDivElement;
    if (textarea.innerText !== this.value) {
      const v = this.value || "";
      textarea.innerText = v;
    }
  }

  on_input() {
    const textarea = this.$refs.textarea as HTMLDivElement;
    const input = this.$refs.input as HTMLInputElement;

    input.value = textarea.innerText;
    this.$emit("input", textarea.innerText);
  }
}
</script>
