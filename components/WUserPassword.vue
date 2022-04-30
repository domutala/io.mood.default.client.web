<template>
  <n-modal @close="$emit('close')">
    <form ref="form" class="form" @submit.prevent="presubmit">
      <div class="main">
        <div>
          <n-input
            v-model="data.password"
            class="inp"
            placeholder="Mot de passe *"
          >
            <input v-model="data.password" type="password" required />
          </n-input>
        </div>
        <div>
          <n-input
            v-model="data.password_confirmation"
            class="inp"
            placeholder="Confirmer mot de passe *"
          >
            <input
              v-model="data.password_confirmation"
              type="password"
              required
            />
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
import { Vue, Component, Getter } from "nuxt-property-decorator";
import { ISession } from "~/models/Session";

@Component
export default class extends Vue {
  @Getter("get", { namespace: "session" })
  session!: ISession;

  data = {
    password: "",
    password_confirmation: "",
  };

  loading = false;

  mounted() {
    this.init();
  }

  init() {}

  presubmit() {
    if (this.loading) return;
    this.loading = true;
    this.submit();
  }

  submit() {
    this.$nuxt.context.$server
      .request({
        url: "/controle/user/password",
        method: "post",
        params: { id: this.session.user?.value.id },
        data: this.data,
      })
      .then(() => {
        this.$emit("close");
      })
      .finally(() => {
        this.loading = false;
      });
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/_variables";

.form {
  width: 450px;
  max-width: 100%;

  .main {
    padding: 42px;
    margin: auto;

    > div {
      margin: 5px;
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
