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
                <label for="fullname" class="font-weight-bold"
                  >Nombre completo</label
                >
              </div>
              <div class="col-6 text-right">
                <small for="fullName" class="font-weight-lighter"
                  >Nombre de tu contacto</small
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
                <small for="email" class="font-weight-lighter">
                  Email del contacto.</small
                >
              </div>
            </div>
            <Field
              type="text"
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
                <label for="phoneNumber" class="font-weight-bold"
                  >Numero Celular</label
                >
              </div>
              <div class="col-6 text-right">
                <small for="phoneNumber" class="font-weight-lighter"
                  >Numero de contacto.</small
                >
              </div>
            </div>
            <Field
              type="text"
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

import { contactService } from '../modules/users/contacts.service';
import { getFromObjectPathParsed } from '../utils';

export default {
  name: 'ManageContact',
  data() {
    return {
      data: {
        id: 0,
        email: '',
        phoneNumber: '',
        fullName: '',
        userId: 0
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
    currentUser: (state) => state.user
  }),
  setup() {
    // Using yup to generate a validation schema
    const schema = Yup.object().shape({
      fullName: Yup.string().min(5).required(),
      email: Yup.string().email().required(),
      phoneNumber: Yup.number().required()
    });

    return {
      schema
    };
  },
  async created() {
    this.loading = true;

    try {
      this.data.userId = this.currentUser.id;

      const result = await contactService.getContact({
        userId: this.currentUser.id
      });

      if (result) {
        this.data.id = result.id;
        this.data.email = result.email;
        this.data.phoneNumber = result.phone;
        this.data.fullName = result.full_name;
      }
    } catch (error) {
      this.successful = false;
      this.message =
        getFromObjectPathParsed(error, 'response.data.message') ||
        error.message;
    }

    this.loading = false;
  },
  methods: {
    async onSubmit(args) {
      // console.log('args', args);

      this.loading = true;

      try {
        const { id, userId, email, phoneNumber, fullName } = this.data;

        let result;
        if (id) {
          result = await contactService.updateContact({
            userId,
            email,
            phone: phoneNumber,
            fullName
          });
        } else {
          result = await contactService.createContact({
            userId,
            email,
            phone: phoneNumber,
            fullName
          });
        }

        this.data.id = result.id;
        this.data.email = result.email;
        this.data.phoneNumber = result.phone;
        this.data.fullName = result.full_name;
        this.data.userId = result.user_id;

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
