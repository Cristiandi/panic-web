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
                <label for="oldPassword" class="font-weight-bold"
                  >Clave Actual</label
                >
              </div>
              <div class="col-6 text-right">
                <small for="oldPassword" class="font-weight-lighter"
                  >Pon tú clave actual aqui.</small
                >
              </div>
            </div>
            <Field
              type="password"
              class="form-control"
              id="oldPassword"
              name="oldPassword"
              as="input"
              v-model="data.oldPassword"
            />
            <span class="validation">{{ errors.oldPassword }}</span>
          </div>

          <div class="form-group">
            <div class="row">
              <div class="col-6">
                <label for="new-password" class="font-weight-bold"
                  >Clave Nueva</label
                >
              </div>
              <div class="col-6 text-right">
                <small for="new-password" class="font-weight-lighter"
                  >Pon tú clave nueva aqui.</small
                >
              </div>
            </div>
            <Field
              type="password"
              class="form-control"
              id="newPassword"
              name="newPassword"
              as="input"
              v-model="data.newPassword"
            />
            <span class="validation">{{ errors.newPassword }}</span>
          </div>

          <div class="form-group">
            <div class="row">
              <div class="col-6">
                <label for="newPasswordConfirm" class="font-weight-bold"
                  >Confirma Clave</label
                >
              </div>
              <div class="col-6 text-right">
                <small for="newPasswordConfirm" class="font-weight-lighter"
                  >Repitela.</small
                >
              </div>
            </div>
            <Field
              type="password"
              class="form-control"
              id="newPasswordConfirm"
              name="newPasswordConfirm"
              as="input"
              v-model="data.newPasswordConfirm"
            />
            <span class="validation">{{ errors.newPasswordConfirm }}</span>
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

<script>
import { mapState } from 'vuex';
import { Field, Form } from 'vee-validate';
import * as Yup from 'yup';
import { userService } from '../modules/users/users.service';
import { getFromObjectPathParsed } from '../utils';

export default {
  name: 'ChangePassword',
  data() {
    return {
      data: {
        oldPassword: '',
        newPassword: '',
        newPasswordConfirm: ''
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
    // Using yup to generate a validation schema
    const schema = Yup.object().shape({
      oldPassword: Yup.string().required(),
      newPassword: Yup.string().min(6).required(),
      newPasswordConfirm: Yup.string()
        .required()
        .oneOf([Yup.ref('newPassword')], 'Passwords do not match')
    });

    return {
      schema
    };
  },
  methods: {
    async onSubmit(args) {
      // console.log('args', args);

      this.loading = true;

      try {
        
        const { message } = await userService.changePassword({
          email: this.currentUser.email,
          oldPassword: this.data.oldPassword,
          newPassword: this.data.newPassword
        });
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

