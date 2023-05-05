// import type { AxiosError, AxiosRequestConfig } from 'axios';
import { api } from 'src/boot/axios';
import { AxiosResponse } from 'axios';

class OrderService {
  async getOrders(): Promise<any> {
    return await api
      .get<AxiosResponse>('api/orders')
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  }

  async postOrder(data: string): Promise<any> {
    return await api
      .post<AxiosResponse>('api/orders', data)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  }

  async updateOrder(orderId: number, data: string): Promise<any> {
    return await api
      .put<AxiosResponse>('api/orders/' + orderId, JSON.parse(data))
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  }

  async deleteOrder(orderId: number): Promise<any> {
    return await api
      .delete<AxiosResponse>('api/orders/' + orderId)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  }

    async getActiveOrder(userId: number): Promise<any> {
        return await api
            .get<AxiosResponse>('api/orders/active/' + userId)
            .then((response) => response.data)
            .catch((error) => {
                console.log(error);
            });
    }

  async getTasks(): Promise<any> {
    return await api
      .get<AxiosResponse>('engine-rest/task')
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  }



  async submitForm(data: string): Promise<any> {
    return await api
      .post<AxiosResponse>('engine-rest/process-definition/key/order-management/submit-form', data)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  }

  async completeTask(taskId: string): Promise<any> {
    return await api
      .post<AxiosResponse>(`engine-rest/task/${taskId}/complete`, {})
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  }

  async getVariables(processId: string): Promise<any> {
    return await api
      .get<AxiosResponse>(`engine-rest/process-instance/${processId}/variables`)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  }

  async updateVariables(processId: string, data: string): Promise<any> {
    return await api
      .post<AxiosResponse>(`engine-rest/process-instance/${processId}/variables`, data)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  }
}

export default new OrderService();
