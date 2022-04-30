<template>
  <n-modal @close="$emit('close')">
    <form ref="form" class="form" @submit.prevent="presubmit">
      <div class="main">
        <div>
          <h-avatar v-model="avatar" />
          <!-- <n-file v-model="avatar" accept="image/png,image/jpg,image/jpeg">
            <div class="avatar">
              <n-img v-if="avatar" :src="avatar" />
              <div class="spin">
                <i class="fi fi-sr-camera"></i>
              </div>
            </div>
          </n-file> -->
        </div>
        <div>
          <n-input v-model="data.name" class="inp" placeholder="Nom *">
            <input v-model="data.name" type="text" required />
          </n-input>
        </div>
      </div>
      <div class="foot">
        <div></div>
        <div>
          <div class="options">
            <button
              type="button"
              class="btn shine round"
              @click="$emit('close')"
            >
              <div>Annuler</div>
            </button>
            <button class="btn opac round">
              <div>Enregister</div>
              <n-loader v-if="loading" size="24" />
              <i v-else class="fi fi-sr-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    </form>
  </n-modal>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
import { Key } from "~/models";
import { User } from "~/models/User";

@Component
export default class extends Vue {
  @Prop()
  user!: {
    value: User;
    format: { [key: string]: Key };
  };

  loading = false;
  data: { name: string; photo?: string } = { name: "" };
  avatar: string | null = null;

  mounted() {
    this.init();
  }

  init() {
    this.data.name = this.user.format.name.value;

    if (this.user.format.photo) {
      this.avatar = this.user.format.photo.value;
    }
  }

  tosubmit() {
    const form = this.$refs.form as HTMLFormElement;
    form.requestSubmit();
  }

  presubmit() {
    if (this.loading) return;
    this.loading = true;

    if (this.avatar && typeof this.avatar !== "string") {
      this.$nuxt.context.$server
        .request({
          url: "/controle/file/add",
          method: "post",
          data: { files: this.avatar },
        })
        .then((data: any) => {
          this.data.photo = data[0];
          this.submit();
        })
        .catch(() => {
          this.loading = false;
        });
    } else this.submit();
  }

  submit() {
    this.$nuxt.context.$server
      .request({
        url: "/controle/user/update",
        method: "post",
        params: { id: this.user.value.id },
        data: this.data,
      })
      .then((data: any) => {
        this.$emit("close");

        const myEvent = new CustomEvent("user-updated", { detail: data });
        window.dispatchEvent(myEvent);
      })
      .finally(() => {
        this.loading = false;
        this.$emit("child-loading-end");
      });
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/_variables";

.form {
  max-width: 100%;
  width: 662px;

  .main {
    margin: auto;
    max-width: 420px;
    padding: 42px;

    > div {
      &:first-child {
        margin: 0;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 50px;

        .avatar {
          width: 120px;
          height: 120px;
          border-radius: 16em;
          background-color: rgba(var(--dark), 0.07);
          position: relative;
          cursor: pointer;

          > img {
            width: 100%;
            height: 100%;
            border-radius: inherit;
            object-position: center;
            object-fit: cover;
          }

          > .spin {
            width: 24px;
            height: 24px;
            position: absolute;
            background-color: rgba(var(--light), 1);
            border-radius: 16em;
            border: 1px solid rgba(var(--dark), 0.05);
            bottom: 7px;
            right: 7px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }

    @media (max-width: $xs-screen) {
      display: block;

      > div {
        width: calc(100% - 10px);
      }
    }
  }

  > .foot {
    display: flex;
    align-items: center;
    border-top: 1px solid rgba(var(--dark), 0.05);
    background-color: rgba(var(--light), 1);
    display: flex;
    height: 60px;
    position: sticky;
    bottom: 0;

    > div {
      .options {
        display: flex;
        align-items: center;

        > .btn {
          margin-left: 3px;
        }
      }

      &:first-child {
        margin-left: 15px;
      }

      &:last-child {
        margin-left: auto;
        margin-right: 15px;
      }
    }
  }
}
</style>
