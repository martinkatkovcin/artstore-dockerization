<template>
  <q-page class="page row items-center justify-center">
    <div class="main_div items-center justify-center">
      <div>
        <h3 class="heading text-center">{{ $t('Register') }}</h3>
      </div>
      <div class="data items-center justify-center">
        <q-input
          outlined
          v-model="firstName"
          :label="$t('First name')"
        />
        <q-input
          class="margin"
          outlined
          v-model="lastName"
          :label="$t('Last name')"
        />

        <q-input
          class="margin"
          outlined
          v-model="email"
          type="email"
          :label="$t('Email')"
        />

        <q-input
          class="margin"
          outlined
          v-model="phone_number"
          :label="$t('Phone number')"
        />

        <q-input
          class="margin"
          outlined
          v-model="username"
          :label="$t('Username')"
        />

        <q-input
          class="margin"
          outlined
          v-model="password"
          :type="isPwd ? 'password' : 'text'"
          :label="$t('Password')"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

        <q-select
          class="margin"
          outlined
          v-model="role"
          :options="role_options"
          label="Role"
        />

        <div class="q-mt-md" v-if="loginError">
          <div class="bad_data">
            {{ loginError }}
          </div>
        </div>
        <div
          :class="{ 'q-mt-lg': !loginError }"
          class="column items-center justify-center q-mb-sm"
        >
          <q-btn class="button items-center" @click="checkData">
            {{ $t('Register') }}
          </q-btn>
        </div>
        <div class="row justify-center">
          <p class="q-mr-sm">{{ $t('Already have an account?') }}</p>
          <a href="/#/login">{{ $t('Sign in') }}</a>
        </div>
      </div>
    </div>
  </q-page>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import { Notify } from 'quasar';
import { useAuthStore } from 'stores/auth-store';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();
const role_options = [ 'Buyer', 'Seller' ];

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const phone_number = ref('');
const username = ref('');
const password = ref('');
const isPwd = ref(true);
const role = ref('');
const loginError = ref('');

function checkData() {
  let data = {
    first_name: firstName.value,
    last_name: lastName.value,
    username: username.value,
    password: password.value,
    email: email.value,
    phone_number: phone_number.value,
    role: role.value
  };

    authStore.register(data)
        .then((response) => {
            localStorage.clear();
            localStorage.setItem("logged_user_id", response.id);

            router.push('/#/');
        })
        .catch((error) => {
            console.error(error);
            Notify.create({
                message: error.response.data.message,
                position: 'center',
                type: 'negative',
            });
        });
}

</script>

<style scoped lang="scss">
@import '../css/mixins.scss';
.page {
  background-color: white;
  .main_div {
    width: 40%;
    max-width: 550px;
    border-radius: 20px;
    background-color: white;
    box-shadow: 8px 8px 18px 10px rgba(216, 216, 216, 0.916);
    padding: 0px 30px 20px 30px;
    @include media-md-only {
      width: 50%;
    }
    @include media-sm-down {
      width: 80%;
    }
    .heading {
      color: $primary;
      margin-top: 40px;
      margin-bottom: 40px;
    }
    .margin {
      margin-top: 25px;
    }
    .button {
      color: #ebf2fa;
      background-color: $primary;
      margin-top: 15px;
      margin-bottom: 15px;
      font-size: 16px;
    }
    .bad_data {
      color: red;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .bg-image {
      background-image: url(https://cdn.quasar.dev/img/mountains.jpg);
      background-repeat: no-repeat;
      background-size: contain;
    }
  }
}
</style>
