<template>
  <div class="items">
    <div class="item" @click="$emit('click')">
      <div
        class="link"
        :to="{ name: 'index-controle-user' }"
        @click="event('open-user')"
      >
        <i class="fi fi-sr-chess-knight-alt"></i>
        <span>Utilisateurs</span>
      </div>
    </div>
    <!-- <div class="item" @click="$emit('click')">
      <nuxt-link class="link" :to="{ name: 'controle-effectif-list' }">
        <i class="fi fi-sr-list">c</i>
        <span>Clients</span>
      </nuxt-link>
    </div> -->
    <div class="item" :class="{ poper }">
      <a class="link" href="#">
        <i class="fi fi-sr-bell"></i>
        <span>Notifications</span>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { Prop } from "nuxt-property-decorator";
import { Component, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";
import { Params } from "~/models/Params";
import { ISession } from "~/models/Session";

@Component
export default class Comp extends Vue {
  @Getter("get", { namespace: "session" })
  session!: ISession;

  @Getter("get", { namespace: "params" })
  params!: Params;

  @Prop({ type: Boolean, default: false })
  poper!: boolean;

  mounted() {
    setTimeout(this.init, 0);
  }

  init() {}

  event(event: string, value?: any) {
    const myEvent = new CustomEvent(event, { detail: value });
    window.dispatchEvent(myEvent);
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/_variables";

.items {
  .item {
    display: flex;

    .link {
      text-decoration: none;
      display: flex;
      align-items: center;
      position: relative;
      cursor: pointer;

      > i {
        font-size: 150%;
        opacity: 0.5;
        width: calc($menu-width - 1px);
        height: calc($menu-width - 1px);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
      }

      > span {
        background-color: rgba(var(--light), 1);
        padding: 5px;
        display: none;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        font-size: 80%;
        border: 1px solid rgba(var(--dark), 0.05);
        width: max-content;

        position: absolute;
        left: calc(100% + 15px);
        top: 50%;
        transform: translateY(-50%);

        @media (max-width: $sm-screen) {
          top: unset;
          bottom: calc(100% + 15px);
          left: 50%;
          transform: translateX(-50%);
        }
      }

      &:hover {
        > i {
          opacity: 1;
        }

        > span {
          display: block;
        }
      }

      &.active-link {
        i {
          opacity: 1;
          color: rgba(var(--primary), 1);
        }
      }

      @media (max-width: $sm-screen) {
        flex-direction: column-reverse;
      }

      &.list {
        &:not(:last-child) {
          border-bottom: 1px solid rgba(var(--dark), 0.02);
        }

        > .link {
          flex-direction: row;
          width: 100%;

          > i {
            height: calc($menu-width - 20px);
          }

          > span {
            margin-left: 15px;
            margin-bottom: 0;
            box-shadow: none;
            border: 0;
            display: block;
            font-size: 100%;
          }
        }
      }
    }
  }

  &.in {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;

    @media (max-width: $sm-screen) {
      flex-direction: row;
      align-items: flex-end;
    }
  }

  &:not(.in) {
    .item {
      display: flex;

      .link {
        &:not(:last-child) {
          border-bottom: 1px solid rgba(var(--dark), 0.02);
        }

        flex-direction: row;
        width: 100%;

        > i {
          height: calc($menu-width - 20px);
        }

        > span {
          margin-left: 15px;
          margin-right: 25px;
          margin-bottom: 0;
          box-shadow: none;
          border: 0;
          display: block;
          font-size: 100%;
          position: relative;
          transform: unset;
          left: unset;
          right: unset;
          top: unset;
          bottom: unset;
        }
      }
    }
  }
}
</style>
