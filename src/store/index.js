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
    async login({ dispatch }, { email, password }) {
      // sign user in
      const user = await userService.login({ email, password });

      await dispatch('setCurrentUser', user);

      // change route to home
      router.push('/home');
    },
    async setCurrentUser({ commit }, user) {
      const meInformation = await userService.me({ uuid: user.uid });

      // set user in state
      commit('setUser', {
        ...user,
        id: meInformation.id,
        fullName: meInformation.full_name,
        firstName: meInformation.full_name.split(' ')[0],
        phone: meInformation.phone
      });
    },
    async logout({ commit }) {
      await userService.logout();
      // clear user and redirect to /login
      commit('setUser', {});
      router.push('/');
    },
    async handleShowSideBar({ commit }, showSideBar) {
      // set the show side bar value
      // console.log('showSideBar', showSideBar);
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
