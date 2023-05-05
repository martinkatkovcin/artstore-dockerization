import { api } from 'src/boot/axios';
import { RegisterData, LoginData, AuthResponse } from '../contracts/Auth';
import { AxiosResponse } from 'axios';
import { useAuthStore } from 'stores/auth-store';

class AuthService {
  async register(data: RegisterData): Promise<any> {
      const authStore = useAuthStore();
     return await api
         .post<AxiosResponse>('api/users', data)
         .then((response) => {
             if (response.status === 200){
                 authStore.loginError = '';
             }
             return response.data;
         })

  }

    async login(data: LoginData): Promise<AuthResponse> {
        const authStore = useAuthStore();
        return await api
            .post<AuthResponse>('api/users/login', JSON.stringify(data))
            .then((response) => {
                if (response.status === 200) {
                    authStore.loginError = '';
                }
                return response.data;
            })
    }

    async me(): Promise<any> {
        const response = await api.get<AxiosResponse>('api/auth/me');
        return response.data;
    }

}

export default new AuthService();
