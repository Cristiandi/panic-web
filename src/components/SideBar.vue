<template>
  <div id="mySidebar" class="sidebar">
    <a class="closebtn" href="#" @click.prevent="closeSideBar"> × </a>

    <div>
      <div class="text-center">
        <img src="../assets/logo.png" alt="logo" />
      </div>
      <br/>
      <div class="text-center">
        <span class="font-weight-bold">Hola Usuario</span>
      </div>
      <div>
        <router-link class="font-weight-bold" @click="closeSideBar" to="/manage-contact">Edita tús datos.</router-link>
        <router-link class="font-weight-bold" @click="closeSideBar" to="/change-password">Cambia tú clave.</router-link>
        <router-link class="font-weight-bold" @click="closeSideBar" to="/home">Maneja tús contactos.</router-link>
      </div>
    </div>

    <div class="fixed-bottom bottom">
        <hr>
        <div class="text-center">
            <a href="#" class="font-weight-bold" @click.prevent="logout">Cerrar sesión</a>
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

.sidebar a {
  padding: 8px 8px 8px 10px;
  text-decoration: none;
  font-size: 1rem;
  color: black;
  display: block;
  transition: 0.3s;
}

.sidebar span {
  padding: 8px 8px 8px 10px;
  text-decoration: none;
  font-size: 1rem;
  color: black;
  display: block;
  transition: 0.3s;
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

hr {
  border: 2px solid black;
  margin-left: 20px;
  margin-right: 20px;
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