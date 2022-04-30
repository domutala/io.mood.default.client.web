<template>
  <div v-if="loading" class="widget">
    <div style="width: 50%">
      <div style="margin-right: 10px">
        <n-loader-component radius="40px" width="40px" height="40px" />
      </div>
      <div style="width: 80%">
        <n-loader-component radius="12px" width="50%" height="20px" />
        <n-loader-component radius="12px" width="20%" height="12px" />
      </div>
    </div>
  </div>

  <div v-else-if="employee" class="widget u">
    <div>
      <div class="avatar">
        <div v-if="employee.format['10']">
          <n-img :src="employee.format['10']" />
        </div>
      </div>
      <div>
        <div>
          {{ employee.format["2a"].value }}
          {{ employee.format["2b"].value }}
        </div>
        <div
          v-if="employee.format['50']"
          class="sub"
          style="display: flex; flex-wrap: wrap"
        >
          <span>{{ employee.format["50"].value }}</span>
        </div>
      </div>
    </div>
    <!-- <div> -->
    <slot />
    <!-- </div> -->
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
import { Getter } from "vuex-class";

import { ISession } from "~/models/Session";

@Component
export default class extends Vue {
  @Prop()
  id!: string;

  loading = false;
  employee: any = false;

  @Getter("get", { namespace: "session" })
  session!: ISession;

  mounted() {
    this.loading = true;
    this.init();
  }

  init() {
    this.loading = true;

    this.$nuxt.context.$server
      .request({ url: "/controle/employee/get", params: { id: this.id } })
      .then((data: any) => {
        this.employee = data;
      })
      .finally(() => {
        this.loading = false;
      });
  }
}
</script>

<style lang="scss" scoped>
.widget {
  text-decoration: none;
  position: relative;
  border: 1px solid rgba(var(--dark), 0.05);
  background-color: rgba(var(--surface), 1);
  border-radius: 0.6em;
  transition: all 0.5s ease;
  display: flex;
  height: 60px;

  > div {
    padding-left: 15px;
    padding-right: 15px;

    &:first-child {
      display: flex;
      align-items: center;
      justify-content: center;
      width: max-content;

      > .avatar {
        width: 40px;
        height: 40px;
        margin-right: 15px;

        > div {
          border-radius: 16em;
          background-color: rgba(var(--dark), 0.07);
          width: 100%;
          height: 100px;
        }
      }

      .sub {
        font-size: 80%;
        line-height: 1;
      }
    }
  }

  &.u {
    &:hover {
      box-shadow: var(--shadow-color) 0px 10px 50px;
      background-color: rgba(var(--light), 1);
    }
  }
}
</style>
