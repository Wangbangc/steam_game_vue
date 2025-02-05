import { createStore } from 'vuex';

export default createStore({
  state: {
    user: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    clearUser(state) {
      state.user = null;
    },
  },
  actions: {
    login({ commit }, { username, password }) {
      if (username === 'root' && password === '123456') {
        commit('setUser', { username });
        return true;
      }
      return false;
    },
    logout({ commit }) {
      commit('clearUser');
    },
  },
});