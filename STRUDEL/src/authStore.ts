import Vue from "vue";
import Vuex from "vuex";
import { Module, VuexModule, Mutation } from "vuex-module-decorators";
import jwt from "jsonwebtoken";
import createPersistedState from "vuex-persistedstate";

@Module
class AuthModule extends VuexModule {
  token: string | null = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: { [key: string]: any } | null = null;

  @Mutation
  setToken(token: string) {
    this.token = token;
    // all tokens sent to the server are validated, so whilst we should be verifying here, it's not a massive security hole
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.user = jwt.decode(token) as { [key: string]: any } | null;
  }

  @Mutation
  invalidateToken() {
    this.token = null;
    this.user = null;
  }
}

Vue.use(Vuex);

export const Store = new Vuex.Store({
  state: {},
  modules: {
    AuthModule
  },
  plugins: [createPersistedState()]
});
