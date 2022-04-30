<template>
  <div class="nswitch">
    <input ref="input" type="checkbox" :checked="isChecked" @input="on_input" />
    <div class="circle"></div>
    <div class="text on"></div>
    <div class="text off"></div>
    <div class="back">
      <div></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class MLoader extends Vue {
  @Prop({ default: "" }) value: any;
  @Prop({ default: "" }) val!: any;
  @Prop({ default: "" }) notValue!: any;

  get isChecked() {
    let isChecked = false;

    if (this.value) {
      if (typeof this.value === "boolean") {
        isChecked = this.value;
      } else if (typeof this.value === "object" && this.value !== null) {
        const array = this.value;
        const containValue =
          !array.includes(this.val) &&
          !JSON.stringify(array).includes(JSON.stringify(this.val));

        if (containValue) {
          return false;
        } else {
          return true;
        }
      }
    } else {
      isChecked = false;
    }
    return isChecked;
  }

  on_input() {
    if (typeof this.value === "boolean") {
      this.$emit("input", !this.value);
    } else if (typeof this.value === "object" && this.value !== null) {
      const array = this.value;
      const containValue =
        !array.includes(this.val) &&
        !JSON.stringify(array).includes(JSON.stringify(this.val));
      let indexVal = 0;

      array.forEach((item: any, index: number) => {
        if (JSON.stringify(item) === JSON.stringify(this.val)) {
          indexVal = index;
        }
      });

      if (containValue) {
        array.push(this.val);
      } else {
        array.splice(indexVal, 1);
      }

      this.$emit("input", array);
    } else if (this.val !== this.value) {
      this.$emit("input", this.val);
    } else {
      this.$emit("input", this.notValue || null);
    }

    // this.$emit("change", evt);
  }
}
</script>

<style lang="scss" scoped>
.nswitch {
  width: 30px;
  height: 20px;
  border: 0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s ease;
  // overflow: hidden;

  input {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0 !important;
    border-radius: inherit;
    z-index: 100;
    top: 0;
    left: 0;
    margin: 0;
    cursor: pointer;

    &:checked {
      ~ .circle {
        left: calc(100% - 20px);
      }

      ~ .text.off {
        &.off {
          transform: translate(100%);
          position: absolute;
          opacity: 0;
        }

        &.on {
          transform: translate(0);
          position: relative;
          opacity: 1;
        }
      }

      ~ .back {
        div {
          opacity: 1;
          transform: scale(1);
          width: 100%;
          padding-bottom: 100%;
          left: 0;
          border-radius: 50%;
          transition: all 0.25s ease;
        }
      }
    }
  }

  .circle {
    box-shadow: var(--shadow-color) 0px 6px 24px 0px,
      var(--shadow-color) 0px 0px 0px 1px;
    width: 20px;
    height: 20px;
    background: rgba(var(--light), 1);
    border-radius: 20px;
    -webkit-transition: all 0.25s ease;
    transition: all 0.25s ease;
    position: absolute;
    z-index: 10;
    left: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .text {
    font-size: 0.7rem;
    padding: 5px 5px 5px 25px;
    transition: all 0.25s ease 0.05s;
    z-index: 9;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    white-space: nowrap;

    &.on {
      transform: translate(-100%);
      position: absolute;
      opacity: 0;
    }

    &.off {
      transform: translate(100%);
      position: absolute;
      opacity: 0;
    }
  }

  .back {
    width: 100%;
    height: calc(100% - 4px);
    left: 0;
    position: absolute;
    background: rgba(var(--dark), 0.1);
    background: var(--shadow-color);
    z-index: 2;
    border-radius: 50%;
    border-radius: 16em;
    display: flex;
    align-items: center;
    overflow: hidden;

    div {
      width: 100%;
      position: absolute;
      background: rgba(var(--primary), 1);
      border-radius: inherit;
      transition: all 0.25s ease-out;
      transform: scale(1);
      left: -100%;
      border-radius: 50%;
      padding-bottom: 100%;
    }
  }
}
</style>
