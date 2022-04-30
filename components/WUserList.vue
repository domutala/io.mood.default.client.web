<template>
  <n-modal @close="$emit('close')">
    <div>
      <div
        v-if="loading"
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        "
      >
        <n-loader size="36" />
      </div>
      <div v-else class="view" style="width: 450px; max-width: 100%">
        <div class="container">
          <div
            style="
              margin-bottom: 5px;
              display: flex;
              align-items: center;
              padding: 10px;
            "
          >
            <i class="fi fi-sr-chess-knight-alt"></i>
            <div style="margin-left: 5px">Utilisateurs</div>
            <button
              v-if="session.user && session.user.value.super"
              class="btn opac sm round"
              style="margin-left: auto"
              @click="open_add = true"
            >
              <i class="fi fi-sr-plus"></i>
              <span>Ajouter</span>
            </button>
          </div>
          <w-user-list-one v-for="user in ids" :id="user" :key="user" />
          <w-user-add v-if="open_add" @close="open_add = false" />
        </div>
      </div>
    </div>
  </n-modal>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import { Getter } from "vuex-class";
import { ISession } from "~/models/Session";

@Component
export default class extends Vue {
  open_add = false;
  loading = false;
  // users: string[] = [];

  @Getter("get", { namespace: "session" })
  session!: ISession;

  @Getter("ids", { namespace: "users" })
  ids!: string[];

  mounted() {
    // window.addEventListener("user-removed", this.on_removed);
    // window.addEventListener("user-added", this.on_added);
    this.init2();
  }

  init2() {
    this.$nuxt.context.$services.user.refresh();
  }

  init() {
    if (this.loading) return;

    this.loading = true;
    this.open_add = false;
    // this.users = [];

    // this.$nuxt.context.$server
    //   .request({ url: "/controle/user/list" })
    //   .then((data: any) => {
    //     this.users = data;
    //   })
    //   .finally(() => {
    //     this.loading = false;
    //   });
  }

  // on_removed(e: any) {
  //   const id: string = e.detail;
  //   const i = this.users.findIndex((u) => u === id);

  //   if (i !== -1) {
  //     this.users.splice(i, 1);
  //   }
  // }

  // on_added(e: any) {
  //   const id: string = e.detail;
  //   this.users.push(id);
  // }
}
</script>

<style lang="scss" scoped>
.view {
  .container {
    padding-top: 20px;
    padding-bottom: 30px;
    width: 90%;
    max-width: 662px;
    margin: auto;
  }
}
</style>
