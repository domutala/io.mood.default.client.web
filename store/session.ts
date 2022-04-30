import { ActionTree, MutationTree, GetterTree } from "vuex";
import { RootState } from "@/store/types";
import { ISession, ISessionState } from "@/models/Session";

export const namespaced = true;

export const state = (): ISessionState => ({
  session: {},
});

export const getters: GetterTree<ISessionState, RootState> = {
  get(st): ISession | undefined {
    return st.session;
  },
};

export const mutations: MutationTree<ISessionState> = {
  SET_ID(st: ISessionState, payload): void {
    st.session.uid = payload;
  },

  SET_USER(st: ISessionState, payload): void {
    st.session.user = payload;
  },

  SET_KEYS(st: ISessionState, payload): void {
    st.session.keys = payload;
  },

  SET_SERVER_KEYS(st: ISessionState, payload): void {
    st.session.server_keys = payload;
  },

  CLEAN(st: ISessionState): void {
    st.session = {};
  },
};

export const actions: ActionTree<ISessionState, RootState> = {
  setId({ commit }, id) {
    commit("SET_ID", id);
  },
  setUser({ commit }, id) {
    commit("SET_USER", id);
  },
  setKeys({ commit }, keys) {
    commit("SET_KEYS", keys);
  },
  setServerKeys({ commit }, keys) {
    commit("SET_SERVER_KEYS", keys);
  },
  clean({ commit }, keys) {
    commit("CLEAN", keys);
  },
};
