<template>
  <div class="top">
    <div class="in avatar">
      <div>
        <n-img v-if="employee.avatar" :src="employee.avatar" />
      </div>
    </div>

    <div class="in name">
      <div>
        <div>
          <strong>
            {{ employee.format["2a"].value }}
            {{ employee.format["2b"].value }}
          </strong>
        </div>
        <div class="sub" style="display: flex; flex-wrap: wrap">
          <span v-if="employee.format['50']">
            {{ employee.format["50"].value }}
          </span>
        </div>
      </div>
    </div>

    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
import { Getter } from "vuex-class";

import { ISession } from "~/models/Session";

@Component
export default class extends Vue {
  @Prop()
  employee!: any;

  @Getter("get", { namespace: "session" })
  session!: ISession;

  mounted() {}
}
</script>

<style lang="scss" scoped>
@import "~/assets/_variables";

.top {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  position: relative;
  padding: 10px 20px;

  overflow: hidden;
  background-color: rgba(var(--surface), 1);
  position: sticky;
  top: 0;
  z-index: 20;

  > .in {
    &.avatar {
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.5s ease;

      > div {
        height: 56px;
        width: 56px;
        border-radius: 16em;
        background-color: rgba(var(--surface), 1);
        box-shadow: rgba(var(--light), 0.16) 0px 1px 2px,
          rgba(var(--light), 1) 0px 0px 0px 2px;

        @media (max-width: $sm-screen) {
          display: block;
        }
      }
    }

    &.name {
      display: flex;
      align-items: center;
      height: 100%;
      margin-left: 20px;

      > div {
        .sub {
          font-size: 80%;
          line-height: 1;
        }
      }
    }
  }
}
</style>
