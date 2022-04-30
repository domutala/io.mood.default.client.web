<template>
  <n-file
    class="havatar"
    accept="image/png,image/jpg,image/jpeg"
    :required="props.required"
    @input="on_input"
  >
    <h-avatar-show :value="{ value }" />
    <div class="spin">
      <i class="fi fi-sr-camera"></i>
    </div>
  </n-file>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";

@Component
export default class extends Vue {
  @Prop() value!: any;
  @Prop({ type: Object, default: () => ({}) }) props!: { required?: boolean };

  mounted() {
    this.init();
  }

  init() {}

  on_input(file: FileList) {
    this.$emit("input", file);
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/_variables";

.havatar {
  position: relative;
  cursor: pointer;

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
</style>
