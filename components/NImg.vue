<template>
  <div ref="content" class="nimg">
    <img v-if="fi" :key="fi" :src="fi" />
  </div>
</template>

<script lang="ts">
import { Watch } from "nuxt-property-decorator";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop()
  src!: string | FileList;

  fi = "";
  loading = false;

  mounted() {
    this.init();
  }

  @Watch("src", { deep: true })
  init() {
    this.fi = "";

    if (this.src) {
      if (typeof this.src === "string") {
        if (this.src.startsWith("/")) this.fi = this.src;
        else {
          const base_url = this.$nuxt.context.$server.base_url;
          this.fi = `${base_url}/file/stream/?ftoken=${this.src}`;
        }
      } else this.fi = URL.createObjectURL(this.src[0]);
    }
  }

  test() {
    if (this.loading) return;

    this.loading = true;
    this.fi = "";

    this.$nuxt.context.$server
      .request({ url: "/controle/file/get", params: { id: this.src } })
      .then((data: any) => {
        const base_url = this.$nuxt.context.$server.base_url;
        this.fi = `${base_url}/file/stream/?ftoken=${data.token}`;
      })
      .finally(() => {
        this.loading = false;
      });
  }
}
</script>

<style lang="scss" scoped>
.nimg {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: inherit;
}
</style>
