<template>
  <div class="container">
    <div class="row">
      <div
        class="col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-sm-8 offset-sm-2 centered"
      >
        <div v-if="loading" class="form-group text-center">
          <div class="spinner-border text-dark" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
        <div v-if="!loading" class="form-group">
          <button
            type="button"
            class="btn btn-primary btn-lg btn-block"
            id="btnEmitAlert"
            @click="onBtnEmitAlertClick"
          >
            Emitir alerta
          </button>
        </div>
        <div v-if="message" class="form-group">
          <div
            class="alert"
            role="alert"
            :class="successful ? 'alert-success' : 'alert-danger'"
          >
            {{ message }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import { alertService } from '../modules/alerts/alerts.service';
import { getFromObjectPathParsed } from '../utils';

export default {
  name: 'Home',
  data() {
    return {
      successful: false,
      loading: false,
      message: ''
    };
  },
  computed: mapState({
    currentUser: (state) => state.user
  }),
  methods: {
    async onBtnEmitAlertClick(args) {
      this.loading = true;

      try {
        const { message } = await alertService.emitAlert({ userId: this.currentUser.id });
        this.successful = true;
        this.message = message;
      } catch (error) {
        this.successful = false;
        this.message =
          getFromObjectPathParsed(error, 'response.data.message') ||
          error.message;
      }

      this.loading = false;
    }
  }
};
</script>

<style scoped>
.centered {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
}
</style>