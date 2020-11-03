<template>
  <div class="container">
    <div class="row">
      <div
        class="col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-sm-8 offset-sm-2 centered"
      >
        <Form
          @submit="onSubmit"
          v-slot="{ errors }"
          :validation-schema="schema"
        >
          <div class="form-group">
            <div class="row">
              <div class="col-6">
                <label for="fullName" class="font-weight-bold"
                  >Nombre Completo</label
                >
              </div>
              <div class="col-6 text-right">
                <small for="fullName" class="font-weight-lighter"
                  >Escribe tú nombre.</small
                >
              </div>
            </div>
            <Field
              type="text"
              class="form-control"
              id="fullName"
              name="fullName"
              as="input"
              v-model="data.fullName"
            />
            <span class="validation">{{ errors.fullName }}</span>
          </div>
          <div class="form-group">
            <div class="row">
              <div class="col-6">
                <label for="confirmPassword" class="font-weight-bold"
                  >Número de contacto</label
                >
              </div>
              <div class="col-6 text-right">
                <small for="confirmPassword" class="font-weight-lighter"
                  >Tú número celular</small
                >
              </div>
            </div>
            <Field
              type="number"
              class="form-control"
              id="phoneNumber"
              name="phoneNumber"
              as="input"
              v-model="data.phoneNumber"
            />
            <span class="validation">{{ errors.phoneNumber }}</span>
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
          <div v-if="loading" class="form-group text-center">
            <div class="spinner-border text-dark" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
          <div v-if="!loading" class="form-group">
            <button type="submit" class="btn btn-primary btn-block">
              Guardar
            </button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import * as Yup from 'yup';
import { Field, Form } from 'vee-validate';
import { mapState } from 'vuex';

import { userService } from '../modules/users/users.service';
import { getFromObjectPathParsed } from '../utils';

export default {
  name: 'EditMe',
  data() {
    return {
      data: {
        id: 0,
        fullName: '',
        phoneNumber: ''
      },
      successful: false,
      loading: false,
      message: ''
    };
  },
  components: {
    Field,
    Form
  },
  computed: mapState({
    currentUser: state => state.user
  }),
  setup() {
    const schema = Yup.object().shape({
      fullName: Yup.string().min(5).required(),
      phoneNumber: Yup.string().min(10).max(10).required()
    });

    return {
      schema
    };
  },
  async created() {
    if (this.currentUser.id) {
      this.data.id = this.currentUser.id;
      this.data.fullName = this.currentUser.fullName;
      this.data.phoneNumber = this.currentUser.phone ? this.currentUser.phone : '';
      console.log('this.data.phoneNumber', this.data.phoneNumber.length);
    }
  },
  methods: {
    async onSubmit(args) {
      this.loading = true;

      try {
        const result = await userService.update({
          id: this.data.id,
          fullName: this.data.fullName,
          phone: this.data.phoneNumber
        });

        await this.$store.dispatch('setCurrentUser', this.currentUser);

        this.successful = true;
        this.message = result.message;
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

.validation {
  color: red;
}
</style>