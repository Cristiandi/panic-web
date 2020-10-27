<template>
  <nav class="navbar">
    <a class="navbar-brand" href="#" @click.prevent="openSideBar">
      <img
        src="../assets/menu.png"
        width="30"
        height="30"
        alt="menu icon"
        loading="lazy"
      />
    </a>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  methods: {
    openSideBar() {
      // console.log('show side bar');
      this.$store.dispatch('handleShowSideBar', true);
    }
  }
};
</script>