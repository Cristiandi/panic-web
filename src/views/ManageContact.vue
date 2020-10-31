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
                <label for="fullname" class="font-weight-bold">Nombre Completo.</label>
              </div>
              <div class="col-6 text-right">
                <small for="fullnameContact" class="font-weight-lighter"
                  >Nombre de tu contacto</small
                >
              </div>
            </div>
            <Field
              type="text"
              class="form-control"
              id="fullnameContact"
              name="fullnameContact"
              as="input"
              v-model="data.email"
            />
            <span class="validation">{{ errors.email }}</span>
          </div>
        <div class="form-group">
            <div class="row">
              <div class="col-6">
                <label for="emailContact" class="font-weight-bold">Email</label>
              </div>
              <div class="col-6 text-right">
                <small for="emailContact" class="font-weight-lighter"
                  > Email de Contacto.</small
                >
              </div>
            </div>
            <Field
              type="text"
              class="form-control"
              id="emailContact"
              name="emailContact"
              as="input"
            />
            <span class="validation">{{ errors.emailContact }}</span>
        </div>
        <div class="form-group">
            <div class="row">
              <div class="col-6">
                <label for="numberContact" class="font-weight-bold">Numero Celular</label>
              </div>
              <div class="col-6 text-right">
                <small for="numberContact" class="font-weight-lighter"
                  >Numero de contacto.</small
                >
              </div>
            </div>
            <Field
              type="text"
              class="form-control"
              id="numberContact"
              name="numberContact"
              as="input"
            />
            <span class="validation">{{ errors.emailContact }}</span>
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
import { Field, Form } from 'vee-validate';
import * as Yup from 'yup';
import { userService } from '../modules/users/users.service';
//esta importacion que es lo que hace ?
import { getFromObjectPathParsed } from '../utils';
export default {
  name: 'ManageContact',
  data() {
    return {
      data: {
        
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
    // Using yup to generate a validation schema
    const schema = Yup.object().shape({
      
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
        const { message } = await userService.resetPassword({
          email: this.data.email
        });
        this.successful = true;
        this.message = message;
      } catch (error) {
        this.successful = false;
        console.log('error', error.response);
        this.message =
          getFromObjectPathParsed(error, 'response.data.message') ||
          error.message;
      }
      this.loading = false;
    }
  }
};
</script>
