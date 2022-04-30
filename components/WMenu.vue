<template>
  <div class="menu">
    <div ref="top" class="top">
      <div>
        <div>
          <i class="fi fi-sr-grid"></i>
        </div>
        <!-- <i class="fi fi-sr-apps"></i> -->
      </div>
    </div>

    <div ref="body" class="body" :class="{ hide: poper }">
      <w-menu-items class="in" @add-user="open_user_adder = true" />
    </div>

    <div ref="foot" class="foot">
      <div v-if="poper">
        <div class="button">
          <i class="fi fi-sr-menu-dots">m</i>
        </div>

        <w-menu-items
          class="options"
          :poper="true"
          @click="open_popup = false"
          @add-user="open_user_adder = true"
        />
      </div>
      <div v-if="session.user" class="user">
        <div class="button">
          <div>
            <h-avatar-show :value="session.user.format.photo" class="xs" />
          </div>
        </div>
        <div class="options">
          <div>
            <div
              style="margin-bottom: 20px; display: flex; align-items: center"
            >
              <h-avatar-show :value="session.user.format.photo" class="sm" />
              <div style="margin-left: 10px">
                <div style="font-size: 120%">
                  <strong>{{ session.user.format.name.value }}</strong>
                </div>
                <div style="line-height: 1">
                  {{ session.user.format.mail.value }}
                </div>
              </div>
            </div>

            <button class="btn shine sm" @click="setTheme">
              <i v-if="!params.theme" class="fi fi-sr-laptop"></i>
              <i
                v-else-if="params.theme === 'light'"
                class="fi fi-sr-eclipse-alt"
              ></i>
              <i v-else-if="params.theme === 'dark'" class="fi fi-sr-moon"></i>
              <div>Theme</div>
            </button>
            <button class="btn shine sm" @click="open_updater = true">
              <i class="fi fi-sr-pencil"></i>
              <div>Modifier votre profil</div>
            </button>
            <button class="btn shine sm" @click="open_passworder = true">
              <i class="fi fi-sr-lock"></i>
              <div>Changer votre mot de passe</div>
            </button>
            <button class="btn shine sm" @click="logout">
              <n-loader v-if="logout_loading" size="20" />
              <i v-else class="fi fi-sr-power"></i>
              <div>Se déconnecter</div>
            </button>
          </div>
        </div>
      </div>
    </div>

    <w-user-password v-if="open_passworder" @close="open_passworder = false" />
    <w-user-update
      v-if="session.user && open_updater"
      :user="session.user"
      @updated="on_updated"
      @close="open_updater = false"
    />
    <w-user-add v-if="open_user_adder" @close="open_user_adder = false" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";
import { Params } from "~/models/Params";
import { ISession } from "~/models/Session";
import { User } from "~/models/User";

@Component
export default class Comp extends Vue {
  @Getter("get", { namespace: "session" })
  session!: ISession;

  @Getter("get", { namespace: "params" })
  params!: Params;

  loading = false;
  logout_loading = false;
  open_popup = false;

  open_passworder = false;
  open_updater = false;
  open_user_adder = false;

  poper = false;

  mounted() {
    setTimeout(this.init, 0);
  }

  init() {
    this.on_resize();
    window.addEventListener("resize", this.on_resize);
  }

  on_resize() {
    const body = this.$refs.body as HTMLDivElement;
    const top = this.$refs.top as HTMLDivElement;
    const foot = this.$refs.foot as HTMLDivElement;

    let height = "100%";
    let width = "100%";

    if (window.innerWidth > 772) {
      // vertical alignement
      const h = this.$el.getBoundingClientRect().height;
      const g =
        top.getBoundingClientRect().height +
        foot.getBoundingClientRect().height;

      height = `${h - g}px`;
    } else {
      // horizontal alignement
      const h = this.$el.getBoundingClientRect().width;
      const g =
        top.getBoundingClientRect().width + foot.getBoundingClientRect().width;

      width = `${h - g}px`;
    }

    body.style.height = height;
    body.style.width = width;

    const x = body.scrollWidth - body.getBoundingClientRect().width;
    const y = body.scrollHeight - body.getBoundingClientRect().height;

    if (window.innerWidth > 772) this.poper = Math.abs(y) > 1;
    else this.poper = Math.abs(x) > 1;

    if (!this.poper) this.open_popup = false;
  }

  on_updated(user: User) {
    this.open_updater = false;
    this.open_passworder = false;
    this.$nuxt.context.store.dispatch("session/setUser", user);
  }

  setTheme() {
    let theme = this.params.theme;

    if (theme === "dark") theme = "light";
    else if (theme === "light") theme = undefined;
    else if (theme === "dark") theme = "light";
    else theme = "dark";

    this.$nuxt.context.$style.set(theme);
  }

  logout() {
    if (this.logout_loading) return;
    this.logout_loading = true;

    this.$nuxt.context.$server
      .request({ url: "/logout", method: "post" })
      .then(async () => {
        await this.$nuxt.context.store.dispatch("session/clean");
        this.$router.push({ name: "index", replace: true });
      })
      .finally(() => {
        this.logout_loading = false;
      });
  }

  beforeDestroy() {
    window.removeEventListener("resize", this.on_resize);
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/_variables";

.menu {
  position: fixed;
  top: 0;
  left: 0;
  width: $menu-width;
  height: 100%;
  background-color: rgba(var(--light), 1);
  z-index: 100;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border-right: 1px solid rgba(var(--dark), 0.07);
  // box-shadow: rgba(0, 0, 0, 0.07) 0px 3px 12px;

  > .top {
    margin-left: auto;
    margin-bottom: auto;

    > div {
      width: calc($menu-width - 1px);
      height: $menu-width;
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid rgba(var(--dark), 0.05);

      > div {
        text-align: center;
        display: block;
        position: relative;
        text-decoration: none;
        cursor: pointer;

        i {
          font-size: 20px;
        }
      }

      @media (max-width: $sm-screen) {
        border-bottom: 0;
        border-left: 1px solid rgba(var(--dark), 0.05);
      }
    }
  }

  > .body {
    &.hide {
      opacity: 0;
      margin-top: 100%;

      @media (min-width: $sm-screen) {
        margin-top: 0;
        margin-right: 100%;
      }
    }
  }

  > .foot {
    position: relative;
    display: flex;
    flex-direction: column;

    > div {
      cursor: pointer;
      width: calc($menu-width - 1px);
      height: calc($menu-width - 1px);
      display: flex;
      align-items: flex-end;
      justify-content: center;
      position: relative;

      > .button {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      > .options {
        cursor: default;
        position: absolute;
        left: 100%;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
        font-size: 80%;
        z-index: 501;
        background-color: rgba(var(--light), 1);
        border: 1px solid rgba(var(--dark), 0.05);
        display: none;

        @media (max-width: $sm-screen) {
          bottom: calc(100% + 0px);
          left: 0;
        }
      }

      &:hover {
        > .options {
          display: block;
        }
      }

      &.user {
        > .options {
          > div {
            padding: 20px;

            > button {
              width: max-content;

              &:not(:last-child) {
                margin-bottom: 2px;
              }
            }
          }
        }
      }
    }

    @media (max-width: $sm-screen) {
      flex-direction: row-reverse;
      align-items: center;
    }
  }

  @media (max-width: $sm-screen) {
    width: 100%;
    height: calc($menu-width - 1px);
    border: 0;
    border-top: 1px solid rgba(var(--dark), 0.07);
    top: unset;
    bottom: 0;
    z-index: 500;
    flex-direction: row-reverse;
  }

  .popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;

    .back {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(var(--light), 0.1);
    }

    .glob {
      position: absolute;
      // top: 0;
      bottom: 5px;
      left: calc($menu-width + 5px);
      width: calc(100% - $menu-width);

      display: flex;

      > .container {
        height: 100%;
        width: 250px;
        max-width: calc(90% - $menu-width);
        background-color: rgba(var(--light), 1);
        overflow: auto;
        box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em,
          rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
        @media (max-width: $xs-screen) {
          max-width: 90%;
        }

        // scroll
        &::-webkit-scrollbar {
          width: 5px;
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

        &:hover {
          &::-webkit-scrollbar {
            opacity: 1;
          }
        }
      }

      @media (max-width: $sm-screen) {
        left: 5px;
        bottom: calc($menu-width + 5px);
      }

      @media (max-width: $xs-screen) {
        width: 100%;
      }
    }
  }
}
</style>
