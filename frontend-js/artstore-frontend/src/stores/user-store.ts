import { defineStore } from 'pinia';
import UserService from 'src/services/UserService';
import { User } from 'src/models/User';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    activeUser: {} as User,
  }),
  getters: {},
  actions: {
    async fetchUsers() {
      return UserService.getUsers().then((res) => {
        console.log(res);
      });
    },

    async fetchUser(userId: number) {
      return UserService.getUserById(userId).then((res) => {
        console.log(res);
        this.activeUser = res;
        return res;
      });
    },

    async registerUser(data: any) {
      return UserService.postUser(data).then((res) => {
        this.activeUser = res;
      });
    },

    async updateUser(userId: number, data: any) {
      return UserService.updateUser(userId, data).then((res) => {
        console.log(res);
      });
    },

    async deleteUser(userId: number) {
      return UserService.deleteUser(userId).then((res) => {
        console.log(res);
      });
    },
  }
});
