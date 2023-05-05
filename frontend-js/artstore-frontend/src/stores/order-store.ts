import { defineStore } from 'pinia';
import OrderService from 'src/services/OrderService';
//import KafkaOrderService from 'src/services/KafkaOrderService';
import { Order } from 'src/models/Order';

export const useOrderStore = defineStore('orderStore', {
  state: () => ({
    processId: '',
    currentTask: '',

    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: '',
    deliveryMethod: '',
    userId: '',
    voucher: '',
    order: {} as Order

  }),
  getters: {},
  actions: {
    async fetchOrders() {
      return OrderService.getOrders().then((res) => {
        console.log(res);
      });
    },

    async registerUser(data: any) {
      return OrderService.postOrder(data).then((res) => {
        console.log(res);
      });
    },

    async updateOrder(orderId: number, data: string) {
      return OrderService.updateOrder(orderId, data).then((res) => {
        console.log(res);
      });
    },

    /*async kafkaUpdateOrder(data: string) {
      return KafkaOrderService.updateOrder(data).then((res) => {
        console.log(res);
      });
    },*/

    async fetchActivateOrder(userId: number) {
      return OrderService.getActiveOrder(userId).then((res) => {
        console.log(res);
        this.order = res;
        return res;
      });
    },

    async deleteUser(orderId: number) {
      return OrderService.deleteOrder(orderId).then((res) => {
        console.log(res);
      });
    },

    async fetchTasks() {
      return OrderService.getTasks().then((res) => {
        for (const task of res) {
          if (task.processInstanceId === this.processId) {
            this.currentTask = task.id;
          }
        }
      });
    },

    async submitForm(data: string) {
      return OrderService.submitForm(data).then((res) => {
        this.processId = res.id;
      });
    },

    async completeTask() {
      return OrderService.completeTask(this.currentTask);
    },

    async fetchVariables() {
      return OrderService.getVariables(this.processId).then((res) => {
        this.firstName = res.first_name.value;
        this.lastName = res.last_name.value;
        this.email = res.email.value;
        this.phoneNumber = res.phone_number.value;
        this.address = res.address.value;
        this.city = res.city.value;
        this.zipCode = res.zip_code.value;
      });
    },

    async updateVariables(data: string) {
      return OrderService.updateVariables(this.processId, data);
    },
  }
});
