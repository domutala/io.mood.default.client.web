<template>
  <div class="widget">
    <n-input :value="value" :placeholder="placeholder">
      <div v-if="value" class="input">
        <div>
          <div class="content">
            <div v-for="(file, f) in files" :key="f" @click.prevent.stop>
              <div style="position: relative">{{ file.name }}</div>
              <div class="div" @click="remove(f)">
                <i class="fi fi-sr-cross"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <n-file
        slot="right"
        style="cursor: pointer"
        :value="value"
        :accept="props.accept"
        :required="props.required"
        :multiple="props.multiple"
        @input="on_input"
      >
        <i class="fi fi-sr-add-document"></i>
      </n-file>
    </n-input>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";

@Component
export default class extends Vue {
  @Prop() value!: any;

  @Prop({ type: String }) placeholder!: string;
  @Prop({ type: Object, default: () => ({}) }) props!: {
    required?: boolean;
    accept?: string;
    multiple?: boolean;
  };

  get files(): FileList {
    if (!this.value) return {} as FileList;
    if (!this.value.length) return {} as FileList;

    return this.value;
  }

  mounted() {}

  remove(index: any) {
    if (this.files.length) {
      const dt = new DataTransfer();

      for (let i = 0; i < this.files.length; i++) {
        const file = this.files[i];
        if (index !== i) dt.items.add(file);
      }

      this.on_input(dt.files.length ? dt.files : undefined);
    }
  }

  on_input(value?: FileList) {
    this.$emit("input", value);
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/_variables";

.content {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding-top: 7px;

  > div {
    background-color: rgba(var(--dark), 0.1);
    padding: 4px 5px;
    border-radius: 0.6em;
    margin-right: 3px;
    margin-bottom: 3px;
    font-size: 85%;
    position: relative;

    > .div {
      position: absolute;
      top: -7.5px;
      right: -5px;
      width: 15px;
      height: 15px;
      background-color: rgba(var(--danger), 1);
      border-radius: 100%;
      cursor: pointer;
      padding: 0;
      border: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1;

      i {
        font-size: 6px;
        color: rgba(var(--white), 1);
      }
    }
  }
}
</style>
