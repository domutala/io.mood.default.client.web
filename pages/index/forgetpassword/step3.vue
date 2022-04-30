<template>
  <div class="view">
    <form @submit.prevent="submit">
      <n-input :value="password" placeholder="Nouveau mot de passe">
        <i slot="left" class="fi fi-sr-lock text-primary"></i>
        <input v-model="password" name="password" type="password" required />
      </n-input>

      <n-input
        :value="password_confirmation"
        placeholder="Confirmer mot de passe"
      >
        <i slot="left" class="fi fi-sr-lock text-primary"></i>
        <input
          v-model="password_confirmation"
          name="passwordConfirm"
          type="password"
          required
        />
      </n-input>

      <button class="btn opac">
        <n-loader v-if="loading" />
        <i v-else class="fi fi-sr-paper-plane"></i>
        <span>Envoyer</span>
      </button>

      <router-link :to="{ name: 'index-login', replace: true }" class="forget">
        Se connecter
      </router-link>
    </form>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";

@Component
export default class extends Vue {
  loading = false;

  password = "";
  password_confirmation = "";

  mounted() {
    this.init();
  }

  init() {
    if (!this.$nuxt.context.route.query.token) {
      this.$nuxt.context.redirect({
        name: "index-forgetpassword-step1",
        replace: true,
      });
    }
  }

  submit() {
    this.$nuxt.context.$server
      .request({
        url: "/forget-password/step-3",
        method: "post",
        data: {
          password: this.password,
          password_confirmation: this.password_confirmation,
          token: this.$nuxt.context.route.query.token,
        },
      })
      .then(() => {
        this.$nuxt.context.redirect({
          name: "index-login",
          query: { next: this.$route.query.next },
          replace: true,
        });
      });
  }
}
</script>

<style lang="scss" scoped>
.view {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  > form {
    width: 90%;
    max-width: 400px;

    > * {
      margin-bottom: 10px;
    }

    .forget {
      text-decoration: none;
      font-size: 90%;
      opacity: 0.5;
      margin-top: 20px;
      display: block;

      &:hover {
        // text-decoration: underline;
        // text-decoration-style: dotted;
        color: rgba(var(--primary), 1);
        opacity: 1;
      }
    }
  }
}
</style>
