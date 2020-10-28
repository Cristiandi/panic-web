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
          <div class="form-group text-center">
            <img src="../assets/logo.png" alt="logo" />
          </div>
          <div class="form-group">
            <div class="row">
              <div class="col-6">
                <label for="email" class="font-weight-bold">Email</label>
              </div>
              <div class="col-6 text-right">
                <small for="email" class="font-weight-lighter"
                  >Pon tú email.</small
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
                  >Pon tú clave.</small
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
          <div class="form-group" v-if="message">
            <div class="alert alert-danger" role="alert">
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
              Iniciar sesión
            </button>
          </div>
          <div class="form-group text-center">
            <router-link to="/forgotten-password"
              >¿Olvidaste tu clave?</router-link
            >
            <br />
            <router-link to="/signup">¿No tienes cuenta?</router-link>
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

export default {
  name: 'Login',
  data() {
    return {
      data: {
        email: '',
        password: ''
      },
      loading: false,
      message: ''
    };
  },
  components: {
    Field,
    Form
  },
  setup() {
    // Using yup to generate a validation schema
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required()
    });

    return {
      schema
    };
  },
  methods: {
    async onSubmit(args) {
      console.log('args', args);

      this.loading = true;

      try {
        const { email, password } = this.data;

        await this.$store.dispatch('login', {
          email,
          password
        });
      } catch (error) {
        console.log('error making the logiun', error);
        this.message = error.message;
      }

      this.loading = false;
    }
  }
};
</script>
