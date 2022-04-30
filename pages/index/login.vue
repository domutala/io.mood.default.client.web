<template>
  <div class="view">
    <form @submit.prevent="submit">
      <n-input placeholder="Email ou nom d'utilisateur" :value="mail">
        <i slot="left" class="fi fi-sr-user text-primary"></i>
        <input v-model="mail" type="text" required />
      </n-input>

      <n-input placeholder="Mot de passe" :value="password">
        <i slot="left" class="fi fi-sr-lock text-primary"></i>
        <input v-model="password" type="password" required />
      </n-input>

      <button class="btn opac">
        <n-loader v-if="loading" />
        <i v-else class="fi fi-sr-paper-plane"></i>
        <span>Envoyer</span>
      </button>

      <router-link :to="{ name: 'index-forgetpassword' }" class="forget">
        Mot de passe oublié
      </router-link>

      <button class="btn shine round">
        <i class="fi fi-brands-google"></i>
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";

@Component
export default class extends Vue {
  loading = false;
  mail = "";
  password = "";

  mounted() {}

  submit() {
    if (this.loading) return;

    this.loading = true;
    this.$nuxt.context.$server
      .request({
        url: "/login/email-and-password",
        method: "post",
        data: {
          mail: this.mail,
          password: this.password,
          token: this.$nuxt.context.route.params.token,
        },
      })
      .then(() => {
        this.$nuxt.context.redirect({
          name: "index",
          replace: true,
          query: { next: this.$route.query.next as string },
        });
      })
      .finally(() => {
        this.loading = false;
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
    box-shadow: var(--shadow-color) 0px 7px 29px 0px;
    border-radius: 0.6em;
    padding: 20px;

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
