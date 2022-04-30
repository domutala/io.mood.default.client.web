import { ActionTree, MutationTree, GetterTree } from "vuex";
import { RootState } from "@/store/types";
import { Params, ParamsState } from "@/models/Params";

export const namespaced = true;

export const state = (): ParamsState => ({
  params: {
    theme: "light",
  },
});

export const getters: GetterTree<ParamsState, RootState> = {
  get(st): Params | undefined {
    return st.params;
  },
};

export const mutations: MutationTree<ParamsState> = {
  SET_THEME(st: ParamsState, payload): void {
    st.params.theme = payload;
  },
};

export const actions: ActionTree<ParamsState, RootState> = {
  setTheme({ commit }, payload) {
    commit("SET_THEME", payload);
  },
};
