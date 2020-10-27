<template>
  <div class="text-center">
    <h1>HOME</h1>
    <button @click="logout()" type="button" class="btn btn-danger">Danger</button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    logout() {
      this.$store.dispatch('logout');
    }
  }
};
</script>