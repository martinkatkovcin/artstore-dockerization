// import type { AxiosError, AxiosRequestConfig } from 'axios';
import { api } from 'src/boot/axios';
import { AxiosResponse } from 'axios';

class UserService {
  async getUsers(): Promise<any> {
    return await api
      .get<AxiosResponse>('api/users')
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  }

    async getUserById(userId: number): Promise<any> {
        return await api
            .get<AxiosResponse>('api/users/' + userId)
            .then((response) => response.data)
            .catch((error) => {
                console.log(error);
            });
    }

  async postUser(data: string): Promise<any> {
    return await api
      .post<AxiosResponse>('api/users', data)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  }

  async updateUser(userId: number, data: string): Promise<any> {
    return await api
      .put<AxiosResponse>('api/users/' + userId, data)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  }

  async deleteUser(userId: number): Promise<any> {
    return await api
      .delete<AxiosResponse>('api/users/' + userId)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  }
}

export default new UserService();
