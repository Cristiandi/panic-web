<template>
  <NavBar v-if="currentUser" />
  <SideBar v-if="sideBarVisible" />
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>

<script>
import { mapState } from 'vuex';

import NavBar from './components/NavBar';
import SideBar from './components/SideBar';

export default {
  name: 'App',
  data() {
    return {
      currentUser: null,
      sideBarVisible: false
    };
  },
  components: {
    NavBar,
    SideBar
  },
  computed: mapState({
    user: state => state.user,
    showSideBar: state => state.showSideBar
  }),  
  created() {
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      const { type, payload } = mutation;
    
      // console.log('mutation.type', type);
      // console.log('mutation.payload', payload);

      if (type === 'setShowSideBar') {
        this.sideBarVisible = mutation.payload;
      }

      if (type === 'setUser' && payload && payload.uid) {
        this.currentUser = payload;
      } else if (type === 'setUser') {
        this.currentUser = null;
      }
    });
  },
  beforeUnmount() {
    this.unsubscribe();
  }
};
</script>
