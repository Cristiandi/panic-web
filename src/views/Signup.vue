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
                <label for="email" class="font-weight-bold">Email</label>
              </div>
              <div class="col-6 text-right">
                <small for="email" class="font-weight-lighter"
                  >Porfa debe de ser uno válido.</small
                >
              </div>
            </div>
            <Field
              type="email"
              class="form-control"
              id="email"
              name="email"
              as="input"
              v-model="data.email"
            />
            <span class="validation">{{ errors.email }}</span>
          </div>
          <div class="form-group">
            <div class="row">
              <div class="col-6">
                <label for="password" class="font-weight-bold">Clave</label>
              </div>
              <div class="col-6 text-right">
                <small for="password" class="font-weight-lighter"
                  >Piensa en algo seguro.</small
                >
              </div>
            </div>
            <Field
              type="password"
              class="form-control"
              id="password"
              name="password"
              as="input"
              v-model="data.password"
            />
            <span class="validation">{{ errors.password }}</span>
          </div>
          <div class="form-group">
            <div class="row">
              <div class="col-6">
                <label for="confirmPassword" class="font-weight-bold"
                  >Confirma Clave</label
                >
              </div>
              <div class="col-6 text-right">
                <small for="confirmPassword" class="font-weight-lighter"
                  >Debe de ser igual a la anterior.</small
                >
              </div>
            </div>
            <Field
              type="password"
              class="form-control"
              id="confirmPassword"
              name="confirmPassword"
              as="input"
              v-model="data.confirmPassword"
            />
            <span class="validation">{{ errors.confirmPassword }}</span>
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
              Registrarse
            </button>
          </div>
          <div class="form-group text-center">
            <router-link to="/">Inicia sesión</router-link>
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
import { Field, Form } from 'vee-validate';
import * as Yup from 'yup';

import { userService } from '../modules/users/users.service';
import { getFromObjectPathParsed } from '../utils';

export default {
  name: 'Signup',
  data() {
    return {
      data: {
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
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
  setup() {
    const schema = Yup.object().shape({
      fullName: Yup.string().min(5).required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
      confirmPassword: Yup.string()
        .required()
        .oneOf([Yup.ref('password')], 'Passwords do not match'),
      phoneNumber: Yup.number().required()
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
        const { message } = await userService.register({
          email: this.data.email,
          phone: this.data.phoneNumber,
          fullName: this.data.fullName,
          password: this.data.password
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
