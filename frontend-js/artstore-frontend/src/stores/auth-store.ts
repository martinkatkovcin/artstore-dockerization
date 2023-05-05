import { defineStore } from 'pinia';
import AuthService from 'src/services/AuthService';
//import AuthManager from 'src/services/AuthManager';
import {AuthResponse, LoginData, RegisterData} from '../contracts/Auth';

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    user: {} as AuthResponse,
    loginError: ''
  }),
  actions: {
    async register(data: RegisterData) {
      return AuthService.register(data).then((response) => {
        console.log(response);
        this.user = response;
        return response;
      });
    },

    async login(data: LoginData) {
      return AuthService.login(data).then((response) => {
        console.log(response);
        this.user = response;
        return response;
      });
    },

    async me() {
      return AuthService.me().then((response) => {
        this.user = response.user;
        return response.Authenticated;
      });
    },

  }});
