<template>
  <n-modal @close="$emit('close')">
    <form class="form" @submit.prevent="submit">
      <div class="foot">
        <div>Nouvel utilisateur</div>
        <div>
          <div class="options">
            <button
              type="button"
              class="btn round shine"
              @click="$emit('close')"
            >
              <div>Annuler</div>
            </button>
            <button class="btn shine round">
              <div>Enregister</div>
              <n-loader v-if="loading" size="24" />
              <i v-else class="fi fi-sr-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>

      <div class="main">
        <div>
          <n-input placeholder="Email *" :value="data.mail">
            <input v-model="data.mail" type="mail" required />
          </n-input>
        </div>

        <div>
          <n-input :value="data.name" class="inp" placeholder="Nom *">
            <input v-model="data.name" type="text" required />
          </n-input>
        </div>
      </div>
    </form>
  </n-modal>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";

@Component
export default class extends Vue {
  loading = false;
  data = { name: "", mail: "" };

  mounted() {
    this.init();
  }

  init() {}

  submit() {
    if (this.loading) return;
    this.loading = true;

    this.$nuxt.context.$server
      .request({
        url: "/controle/admin/user/add",
        method: "post",
        data: this.data,
      })
      .then((data: any) => {
        this.$emit("close");
        const myEvent = new CustomEvent("user-added", { detail: data });
        window.dispatchEvent(myEvent);
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
  max-width: 100%;
  width: 552px;

  > .foot {
    display: flex;
    align-items: center;
    background-color: rgba(var(--light), 1);
    border-bottom: 1px solid rgba(var(--dark), 0.05);
    display: flex;
    height: 60px;
    position: sticky;
    top: 0;

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

  > .main {
    margin: auto;
    padding: 42px;
    max-width: 420px;

    > div {
      margin-bottom: 5px;
    }
  }
}
</style>
