<template>
  <div ref="button" class="ndropper">
    <slot name="button" />

    <div v-if="open" v-show="show" ref="fake" class="fake">
      <div ref="back" class="back" @click="closer"></div>

      <div :id="`popop${uid}`" ref="popup" class="popup">
        <div class="cop">
          <div ref="spin1" class="spin">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xmlns:svgjs="http://svgjs.com/svgjs"
              viewBox="0 0 292.362 292.362"
              xml:space="preserve"
            >
              <g>
                <g xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M286.935,69.377c-3.614-3.617-7.898-5.424-12.848-5.424H18.274c-4.952,0-9.233,1.807-12.85,5.424   C1.807,72.998,0,77.279,0,82.228c0,4.948,1.807,9.229,5.424,12.847l127.907,127.907c3.621,3.617,7.902,5.428,12.85,5.428   s9.233-1.811,12.847-5.428L286.935,95.074c3.613-3.617,5.427-7.898,5.427-12.847C292.362,77.279,290.548,72.998,286.935,69.377z"
                  ></path>
                </g>
              </g>
            </svg>
          </div>
          <div class="coc">
            <div ref="content">
              <slot />
            </div>
          </div>
          <div ref="spin2" class="spin">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xmlns:svgjs="http://svgjs.com/svgjs"
              viewBox="0 0 292.362 292.362"
              xml:space="preserve"
            >
              <g>
                <g xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M286.935,69.377c-3.614-3.617-7.898-5.424-12.848-5.424H18.274c-4.952,0-9.233,1.807-12.85,5.424   C1.807,72.998,0,77.279,0,82.228c0,4.948,1.807,9.229,5.424,12.847l127.907,127.907c3.621,3.617,7.902,5.428,12.85,5.428   s9.233-1.811,12.847-5.428L286.935,95.074c3.613-3.617,5.427-7.898,5.427-12.847C292.362,77.279,290.548,72.998,286.935,69.377z"
                  ></path>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- <div
      v-if="open"
      v-show="show"
      :id="`popop${uid}`"
      ref="popup"
      class="popup"
    >
      <div>
        <div ref="content">
          <slot />
        </div>
      </div>
    </div> -->
  </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { Base } from "~/mixins/component";

@Component
export default class extends Base {
  @Prop({ type: [String, Array], default: "click" })
  events!: string | string[];

  @Prop({ type: Boolean, default: false })
  spin!: boolean;

  open = false;
  show = false;
  uid = "";

  mounted() {
    this.init();
  }

  init() {
    this.uid = this.$nuxt.context.$utils.token.generate();

    const button = this.$refs.button as HTMLDivElement;
    const events = Array.isArray(this.events) ? this.events : [this.events];

    window.addEventListener("resize", this.rebuild);

    for (const event of events) {
      button.addEventListener(event, () => {
        this.opener();
      });
    }
  }

  rebuild() {
    if (this.open && this.show) this.opener();
  }

  opener() {
    this.open = true;

    setTimeout(() => {
      const body = document.querySelector("body") as HTMLElement;
      const fake = this.$refs.fake as HTMLDivElement;
      const popup = this.$refs.popup as HTMLDivElement;
      // const spin = this.$refs.spin as HTMLDivElement;

      body.appendChild(fake);

      const button = this.$refs.button as HTMLDivElement;
      const content = this.$refs.content as HTMLDivElement;

      const rect = button.getBoundingClientRect();

      let max_height = 0;

      // popup.style.minWidth = `${rect.width}px`;
      popup.style.left = `${rect.left + rect.width / 2}px`;

      popup.style.bottom = "unset";
      popup.style.top = "unset";

      /*
      if (window.innerHeight - rect.top > rect.top) {
        // on bottom
        const top = rect.top + button.offsetHeight + window.scrollY + 4;
        popup.style.top = `${top}px`;
        max_height = window.innerHeight - rect.bottom - 10;
      } else {
        // on top
        const gap = document.documentElement.scrollHeight - window.innerHeight;
        let bottom = window.innerHeight - rect.top;
        bottom = bottom + gap;
        bottom = bottom - window.scrollY;
        bottom = bottom + 4;
        popup.style.bottom = `${bottom}px`;
        max_height = rect.top - 10;
      } 
      */

      let spinh = 10;
      const spins = popup.querySelectorAll(".spin");

      if (!this.spin) {
        spinh = 0;
        spins.forEach((svg) => {
          (svg as HTMLDivElement).style.display = "none";
        });
      }

      if (window.innerHeight - rect.top > rect.top) {
        // on bottom
        const top = rect.top + button.offsetHeight;
        popup.style.top = `${top}px`;
        max_height = window.innerHeight - rect.bottom;

        (
          popup.querySelector(".spin:last-child") as HTMLDivElement
        ).style.display = "none";
      } else {
        // on top
        const bottom = window.innerHeight - rect.top;
        popup.style.bottom = `${bottom}px`;
        max_height = rect.top;

        (
          popup.querySelector(".spin:first-child") as HTMLDivElement
        ).style.display = "none";
      }

      content.style.maxHeight = `${max_height - spinh - 10}px`;
      const svgs = popup.querySelectorAll(".spin svg");

      if (window.innerWidth - rect.left < 450) {
        popup.style.transform = `translateX(calc(-100% + ${rect.width / 2}px))`;
        svgs.forEach((svg) => {
          (svg as HTMLDivElement).style.marginLeft = "auto";
        });
      } else {
        popup.style.transform = `translateX(calc(-${rect.width / 2}px))`;
        svgs.forEach((svg) => {
          (svg as HTMLDivElement).style.marginRight = "auto";
        });
      }

      this.show = true;
      this.$emit("open");

      setTimeout(() => {
        popup.focus();
      }, 100);
    }, 100);
  }

  closer() {
    const body = document.querySelector("body") as HTMLBodyElement;
    const fake = this.$refs.fake as HTMLDivElement;

    if (fake && fake.parentElement === body) {
      body.removeChild(fake);
      this.$el.appendChild(fake);
    }

    this.show = false;
    this.open = false;
    this.$emit("close");
  }

  beforeDestroy() {
    window.removeEventListener("resize", this.rebuild);

    this.closer();
  }
}
</script>

<style lang="scss" scoped>
.back {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 499;
  // pointer-events: none;
  // background-color: rgba(var(--dark), 0.000000000001);
}

.fake {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 500;
  // pointer-events: none;
}

.popup {
  position: absolute;
  z-index: 501;
  border-radius: 0.6em;
  border: 0;
  outline: none;
  padding: 0;

  > .cop {
    border-radius: inherit;
    padding-top: 5px;
    padding-bottom: 5px;

    .spin {
      overflow: hidden;
      padding-left: 8px;
      padding-right: 8px;
      height: 10px;

      > svg {
        width: 20px;
        height: 20px;
        z-index: 0;
        fill: rgba(var(--light), 1);
        transform: rotateZ(180deg) translatey(2px);
        display: block;
        line-height: 1;
      }

      &:last-child {
        > svg {
          transform: translateY(-6px);
        }
      }
    }

    > .coc {
      border-radius: inherit;
      overflow: hidden;
      background-color: rgba(var(--light), 1);
      box-shadow: var(--shadow-color) 0px 7px 29px 0px;

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
  }
}
</style>
