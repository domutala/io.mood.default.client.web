<template>
  <div class="widget">
    <div v-if="loading" class="content">
      <div style="width: 80%">
        <n-loader-component radius="12px" width="50%" height="20px" />
        <n-loader-component radius="12px" width="20%" height="12px" />
      </div>
      <div style="margin-left: auto; margin-left: 5px">
        <n-loader-component radius="32px" width="32px" height="32px" />
      </div>
      <div style="width: 30px; display: flex; justify-content: center">
        <n-loader-component radius="12px" width="20px" height="5px" />
      </div>
    </div>

    <div v-else-if="user" class="content user">
      <div>
        <div>
          {{ user.format.name.value }}
        </div>
        <div class="sub" style="display: flex; flex-wrap: wrap">
          <span>{{ user.format.mail.value }}</span>
        </div>
      </div>

      <div style="margin-left: auto">
        <h-avatar-show
          :value="user.format.photo"
          style="margin: 15px auto"
          class="xs"
        />
      </div>
      <n-dropper ref="dropper" class="menu">
        <div slot="button" class="button">
          <i class="fi fi-sr-menu-dots"></i>
        </div>
        <div class="options">
          <div>
            <div>
              <h-avatar-show
                :value="user.format.photo"
                style="margin: auto"
                class="md"
              />
              <div class="name">
                <div>
                  <strong>{{ user.format.name.value }}</strong>
                </div>
                <div class="sub">
                  {{ user.format.mail.value }}
                </div>
              </div>

              <div
                v-if="
                  session.user && !user.value.super && session.user.value.super
                "
                class="btns"
              >
                <button class="btn shine sm" @click="opener('update')">
                  <div>modifier</div>
                </button>
                <button class="btn shine sm" @click="opener('blocked')">
                  <div>
                    {{ user.value.data.blocked ? "Débloquer" : "Bloquer" }}
                  </div>
                </button>
                <button class="btn shine sm danger" @click="opener('remove')">
                  <div>supprimer</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </n-dropper>

      <component
        :is="`w-user-${modal}`"
        v-if="modal"
        :user="user"
        @close="modal = ''"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
import { Getter } from "vuex-class";

import { ISession } from "~/models/Session";
import { User, UserFormat } from "~/models/User";
import { Key } from "~/models/Employee";

@Component
export default class extends Vue {
  @Prop()
  id!: string;

  loading = false;
  modal = "";

  user: { value: User; format: { [key: string]: Key } } | false = false;

  @Getter("get", { namespace: "session" })
  session!: ISession;

  @Getter("get", { namespace: "users" })
  users0!: { [key: string]: UserFormat };

  mounted() {
    this.init();
  }

  on_updated(e: any) {
    const user: { value: User; format: { [key: string]: any } } = e.detail;

    if (user.value.id === this.id) {
      this.user = user;
    }
  }

  init() {
    window.addEventListener("user-updated", this.on_updated);
    this.loading = true;

    this.$nuxt.context.$server
      .request({ url: "/controle/user/get", params: { id: this.id } })
      .then((data: any) => {
        this.user = data;
      })
      .finally(() => {
        this.loading = false;
      });
  }

  opener(modal: string) {
    const dropper = this.$refs.dropper as any;
    dropper.closer();

    this.modal = modal;
  }
}
</script>

<style lang="scss" scoped>
.widget {
  &:not(:last-child) {
    margin-bottom: 5px;
  }
}
.content {
  border: 1px solid rgba(var(--dark), 0.05);
  border-radius: 0.6em;
  background-color: rgba(var(--surface), 1);
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: all 0.5s ease;
  height: 60px;
  padding-left: 15px;
  padding-right: 15px;

  > div {
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 16em;
      background-color: rgba(var(--dark), 0.07);
    }

    .sub {
      font-size: 80%;
      line-height: 1;
    }
  }

  &.user {
    position: relative;

    .menu {
      width: 30px;
      margin-left: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      cursor: pointer;
    }

    &:hover {
      box-shadow: var(--shadow-color) 0px 10px 50px;
      background-color: rgba(var(--light), 1);
      z-index: 10;

      .options {
        display: flex;
      }
    }
  }
}

.options {
  > div {
    width: 300px;
    max-width: 100%;

    > div {
      padding: 30px;

      .name {
        margin-top: 10px;
        text-align: center;

        .sub {
          font-size: 80%;
          line-height: 1;
        }
      }

      .btns {
        margin-top: 20px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;

        > .btn {
          margin: 2px;
        }
      }
    }
  }
}
</style>
