<template>
  <n-select
    :placeholder="placeholder"
    :options="props.options"
    :required="props.required"
    :value="value"
    @input="on_input"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop() value!: any;
  @Prop({ type: String }) placeholder!: string;
  @Prop({ type: Object, default: () => ({ options: [] }) })
  props!: {
    required?: boolean;
    options: { text: string; icon: string; value: any }[];
  };

  mounted() {}

  on_input(val: any) {
    this.$emit("input", val);
  }
}
</script>

<style lang="scss" scoped>
.group {
  display: flex;
  flex-wrap: wrap;

  button {
    border: 1px solid rgba(var(--dark), 0.07);
    border-radius: 0.6em;
    margin-right: 2px;
    margin-bottom: 2px;
    font-size: 12px;
    background-color: rgba(var(--dark), 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    line-height: 1;
    padding: 3px 5px;

    i {
      margin-right: 5px;
    }

    &:hover {
      background-color: rgba(var(--primary), 0.5);
      color: rgba(var(--white), 1);
    }
  }
}
.options {
  display: flex;
  width: 100%;
  border: 0;
  outline: none;
  height: 42px;
  background-color: transparent;
  display: flex;
  align-items: center;
  padding: 0 15px;
  cursor: pointer;
  line-height: 1;

  .index {
    width: 8px;
    height: 8px;
    margin-right: 10px;
    border-radius: 0.4em;
    background-color: rgba(var(--dark), 0.1);
  }

  &.select {
    .index {
      background-color: rgba(var(--success), 1);
    }
  }

  &:hover {
    background-color: rgba(var(--primary), 1);

    * {
      color: rgba(var(--white), 1);
    }
  }
}
</style>
