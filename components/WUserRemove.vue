<template>
  <n-modal @close="$emit('close')">
    <div ref="form" class="form" @submit.prevent="presubmit">
      <div class="main">
        Vous allez supprimer
        <strong>{{ user.format.name.value }}</strong>
        des utilisateur.
      </div>
      <div class="foot">
        <button type="button" class="btn shine round" @click="$emit('close')">
          <div>Annuler</div>
        </button>
        <button
          class="btn opac round danger"
          style="margin-left: 5px"
          @click="presubmit"
        >
          <div>Supprimer</div>
          <n-loader v-if="loading" size="24" />
          <i v-else class="fi fi-sr-trash"></i>
        </button>
      </div>
    </div>
  </n-modal>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
import { Key } from "~/models/Employee";
import { User } from "~/models/User";

@Component
export default class extends Vue {
  @Prop()
  user!: {
    value: User;
    format: { [key: string]: Key };
  };

  loading = false;
  avatar = "";

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
        url: "/controle/admin/user/remove",
        method: "post",
        params: { id: this.user.value.id },
      })
      .then(() => {
        this.$emit("close");
        const myEvent = new CustomEvent("user-removed", {
          detail: this.user.value.id,
        });
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
  .main {
    max-width: 442px;
    margin: auto;
    padding: 42px;
    text-align: center;
  }

  > .foot {
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid rgba(var(--dark), 0.05);
    background-color: rgba(var(--light), 1);
    height: 60px;
    position: sticky;
    bottom: 0;
  }
}
</style>
