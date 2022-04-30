<template>
  <div class="ninput" :class="{ error, success }">
    <div class="cadre" :class="{ labeled: val }">
      <slot name="left" />
      <div class="include">
        <div v-if="placeholder" class="placeholder">
          <span>{{ placeholder }}</span>
        </div>
        <slot />
      </div>
      <slot name="right" />
    </div>

    <div v-if="error && error !== true" class="error">
      {{ error }}
    </div>
    <div v-if="success && success !== true" class="success">
      {{ success }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import jsquery from "jquery";

@Component
export default class extends Vue {
  @Prop()
  value!: any;

  @Prop({ type: String })
  placeholder!: string;

  @Prop({ type: [String, Boolean], default: false })
  error!: string | boolean;

  @Prop({ type: [String, Boolean], default: false })
  success!: string | boolean;

  get val() {
    if (typeof this.value === "boolean") {
      return this.value.toString().length !== 0;
    }

    if (!this.value) return false;

    if (Array.isArray(this.value)) return this.value.length !== 0;

    if (["string", "number"].includes(typeof this.value)) {
      return (this.value as string).toString().length !== 0;
    }

    if (typeof this.value === "object") {
      return !jsquery.isEmptyObject(this.value);
    }

    return false;
  }

  mounted() {
    this.init();
  }

  init() {}
}
</script>

<style lang="scss">
$input-height: 50px;

.ninput {
  width: 100%;

  .cadre {
    border-radius: 0.6em;
    box-shadow: rgba(var(--dark), 0.06) 0px 0px 0px 1px;
    display: flex;
    padding-left: 10px;
    padding-right: 10px;

    .include {
      width: 100%;
      position: relative;

      .text,
      .input,
      select,
      input {
        border: 0;
        width: 100%;
        min-height: $input-height;
        padding: 0;
        background-color: transparent;
        outline: none;
        font: inherit;
        color: inherit;
        line-height: 1;
        position: relative;

        &.input {
          display: flex;
          align-items: center;
          cursor: default;
        }

        &.text {
          > div {
            max-height: 200px;
            overflow: auto;
            width: 100%;
            min-height: $input-height;
            font: inherit;
            color: inherit;
            line-height: 1;
            transition: all 0.25s ease;
          }
        }
      }

      .placeholder {
        user-select: none;
        width: 100%;
        height: $input-height;
        display: flex;
        align-items: center;
        color: rgba(var(--dark), 1);
        line-height: 1;
        position: absolute;
        top: 0;
        left: 0;

        span {
          transition: all 0.25s ease;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 100%;
          opacity: 0.7;
        }
      }
    }

    > * {
      &:not(.include) {
        display: flex;
        align-items: center;
        justify-content: center;
        height: $input-height;

        &:first-child {
          margin-right: 10px;
        }

        &:last-child {
          margin-left: 10px;
        }
      }
    }

    &.labeled,
    &:focus-within {
      &:focus-within {
        box-shadow: rgba(var(--primary), 0.6) 0px 0px 0px 1px;
      }

      .include {
        .text {
          min-height: unset;

          > div {
            margin-top: 17px;
            margin-bottom: 1px;
            min-height: unset;
          }
        }
        .placeholder {
          position: absolute;
          top: 3px;
          font-size: 70%;
          height: 16px;
          z-index: 1;
        }
      }
    }
  }

  &.error {
    .cadre {
      box-shadow: rgba(var(--danger), 0.6) 0px 0px 0px 1px;
    }
  }
  &.success {
    .cadre {
      box-shadow: rgba(var(--success), 0.6) 0px 0px 0px 1px;
    }
  }

  .success,
  .error {
    font-size: 80%;
    color: rgba(var(--danger), 1);
    padding-left: 7px;
    padding-right: 7px;
    margin-top: 2px;

    &.success {
      color: rgba(var(--success), 1);
    }
  }

  + {
    margin-top: 10px;
  }
}
</style>
