import { createStore } from 'vuex';

import { userService } from '../modules/users/users.service';
import router from '../router';

export default createStore({
  state: {
    user: {},
    showSideBar: true
  },
  mutations: {
    setUser(state, val) {
      state.user = val;
    },
    setShowSideBar(state, val) {
      state.showSideBar = val;
    }
  },
  actions: {
    async signup({ dispatch }, data) {
      // register the user
      const user = await userService.register({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
        phone: data.phone
      });

      dispatch('setCurrentUser', user);
    },
    async login({ dispatch }, { email, password }) {
      // sign user in
      const user = await userService.login({ email, password });

      dispatch('setCurrentUser', user);
    },
    async setCurrentUser({ commit }, user) {
      // set user in state
      commit('setUser', user);

      // change route to home
      router.push('/home');
    },
    async logout({ commit }) {
      await userService.logout();
    
      // clear user and redirect to /login
      commit('setUser', {});
      router.push('/');
    },
    async handleShowSideBar({ commit }, showSideBar) {
      // set the show side bar value
      console.log('showSideBar', showSideBar);
      commit('setShowSideBar', showSideBar);
    }
  },
  modules: {
  },
  getters: {
    user(state) {
      return state.user;
    },
    showSideBar(state) {
      return state.showSideBar;
    }
  }
});
