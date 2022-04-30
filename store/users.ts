import { ActionTree, MutationTree, GetterTree } from "vuex";
import { RootState } from "@/store/types";
import { UserFormat, UsersState } from "@/models/User";

export const namespaced = true;

export const state = (): UsersState => ({
  users: {},
  ids: [],
});

export const getters: GetterTree<UsersState, RootState> = {
  get(st): any | undefined {
    return st.users;
  },

  ids(st): string[] {
    return st.ids;
  },
};

export const mutations: MutationTree<UsersState> = {
  ADD(st: UsersState, payload: string): void {
    if (!st.ids) st.ids = [];

    const i = st.ids.findIndex((id) => id === payload);
    if (i === -1) st.ids.push(payload);
  },

  UPDATE(st: UsersState, payload: UserFormat): void {
    st.users[payload.value.id] = payload;
  },

  REMOVE(st: UsersState, payload: string): void {
    const i = st.ids.findIndex((id) => id === payload);

    if (i !== -1) {
      delete st.users[st.ids[i]];
      st.ids.splice(i, 1);
    }
  },
};

export const actions: ActionTree<UsersState, RootState> = {
  add({ commit }, payload) {
    commit("ADD", payload);
  },

  update({ commit }, payload) {
    commit("UPDATE", payload);
  },

  remove({ commit }, payload) {
    commit("REMOVE", payload);
  },
};
