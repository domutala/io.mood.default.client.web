<template>
  <div class="nmodal" :class="{ blur }">
    <div class="back" @click="close"></div>

    <div class="popup">
      <div>
        <div ref="content">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { Base } from "~/mixins/component";

@Component
export default class extends Base {
  @Prop({ type: Boolean, default: false })
  blur!: boolean;

  @Prop({ type: Boolean, default: true })
  closeOnBack!: boolean;

  @Prop({ type: Boolean, default: true })
  closeOnEsc!: boolean;

  mounted() {
    window.addEventListener("keydown", this.onEscPress);
    this.init();
  }

  beforeDestroy() {
    this.destroy();
  }

  init() {
    this.sizer();
    window.addEventListener("resize", this.sizer);

    const body = document.querySelector("body") as HTMLElement;
    if (body) {
      body.setAttribute("style", "overflow: hidden");
      body.appendChild(this.$el);
      this.$emit("open");
    }
  }

  sizer() {
    const content = this.$refs.content as HTMLDivElement;
    const max_height = window.innerHeight * 0.9;
    content.style.maxHeight = `${max_height}px`;
  }

  destroy() {
    window.removeEventListener("keydown", this.onEscPress);
    window.removeEventListener("resize", this.sizer);

    const body = document.querySelector("body");
    const modals = document.querySelectorAll(".nmodal");

    if (body && modals.length <= 1) {
      body.setAttribute("style", "overflow: auto");
    }

    if (body && this.$el.parentNode === body) {
      body.removeChild(this.$el);
    }
  }

  close() {
    this.$emit("close");
  }

  onBackClick() {
    if (this.closeOnBack) {
      this.close();
    }
  }

  onEscPress(e: any) {
    if (e.keyCode === 27 && this.closeOnEsc) {
      this.canclose();
    }
  }

  canclose() {
    const modals = document.querySelectorAll(".nmodal");
    const el = modals.item(modals.length - 1);

    if (el.getAttribute(this.$attr) !== null) {
      this.close();
    }
  }
}
</script>

<style lang="scss">
@import "~/assets/_variables";

.nmodal {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 500;

  > .back {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
    background-color: rgba(var(--light), 0.5);
    // backdrop-filter: saturate(180%) blur(15px);
  }

  > .popup {
    position: relative;
    z-index: 2;
    background-color: rgba(var(--light), 1);
    border-radius: 0.6em;
    max-width: 90%;
    max-height: 90%;
    // box-shadow: rgba(var(--black), 0.2) 0px 8px 24px;
    box-shadow: var(--shadow-color) 0px 7px 29px 0px;

    > div {
      border-radius: inherit;
      overflow: hidden;

      > div {
        overflow: auto;
        border-radius: inherit;

        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: -1;
          border-radius: inherit;
          box-shadow: rgba(var(--dark), 0.06) 0px 0px 0px 1px;
        }

        &::-webkit-scrollbar {
          width: 7px;
          margin-top: 50px;
        }

        /* Track */
        &::-webkit-scrollbar-track {
          background: rgba(var(--dark), 0.1);
          border-radius: inherit;
        }

        /* Handle */
        &::-webkit-scrollbar-thumb {
          background: rgba(var(--dark), 0.2);
          border-radius: inherit;

          &:hover {
            background: rgba(var(--dark), 0.5);
          }
        }
      }
    }

    @media (max-width: $xs-screen) {
      max-width: 100% !important;
      max-height: 90% !important;
      width: 100% !important;
      // height: 100% !important;
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
      margin-top: auto;
    }
  }
}
</style>
