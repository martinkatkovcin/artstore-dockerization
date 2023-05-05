<template>
  <q-page class="page row items-center justify-center">
    <div class="main_div items-center justify-center">
      <div>
        <h3 class="heading text-center">{{ $t('Login') }}</h3>
      </div>
      <div class="data items-center justify-center">
        <q-input
          outlined
          v-model="username"
          :label="$t('Username')"
        />
        <q-input
          class="password-input"
          outlined
          v-model="password"
          :type="isPwd ? 'password' : 'text'"
          :label="$t('Password')"
          v-on:keyup.enter="login"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <div class="q-mt-md" v-if="loginError">
          <div class="bad_data">
            {{ loginError }}
          </div>
        </div>
        <div
          :class="{ 'q-mt-lg': !loginError }"
          class="column items-center justify-center q-mb-sm"
        >
          <q-btn class="button items-center" @click="login">
            {{ $t('Sign in') }}
          </q-btn>
        </div>
        <div class="row justify-center">
          <p class="q-mr-sm">{{ $t('Don\'t have account?') }}</p>
          <a href="/#/register">{{ $t('Sign up') }}</a>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth-store';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import {Notify} from 'quasar';

// instance of pinia store and router
const authStore = useAuthStore();
const router = useRouter();

// computed properties
const loginError = computed<string>(() => authStore.loginError);

const username = ref('');
const password = ref('');
const isPwd = ref(true);

function login(): void {
    let data = {
        username: username.value,
        password: password.value
    };
    authStore.login(data).then((response) => {
        localStorage.clear();
        localStorage.setItem("logged_user_id", response.id);
        Notify.create({
            message: 'Logged in successfully!',
            position: 'top',
            type: 'positive',
        });

        router.push('/#/');
    }).catch((error) => {
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

    .password-input {
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
