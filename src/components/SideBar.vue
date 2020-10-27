<template>
  <div id="mySidebar" class="sidebar">
    <span class="closebtn" @click.prevent="closeSideBar"> × </span>
    <div class="fixed-bottom bottom">
        <hr>
        <div class="text-center">
            <span class="font-weight-bold" @click="logout">Cerrar sesión</span>
        </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  height: 100%;
  width: 300px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  overflow-x: hidden;
  padding-top: 60px;
  background-color: #c4c4c4 !important;
}

.sidebar .closebtn {
  position: absolute;
  top: 0;
  right: 5px;
  font-size: 36px;
  margin-left: 50px;
  color: black;
}

.bottom {
  width: 300px;
}
/* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
@media screen and (max-height: 450px) {
  .sidebar {
    padding-top: 15px;
  }
  .sidebar a {
    font-size: 1rem;
  }
}
</style>

<script>
export default {
  name: 'SideBar',
  methods: {
    closeSideBar() {
      // console.log('show side bar');
      this.$store.dispatch('handleShowSideBar', false);
    },
    logout() {
      this.$store.dispatch('handleShowSideBar', false);
      this.$store.dispatch('logout');
    }
  }
};
</script>