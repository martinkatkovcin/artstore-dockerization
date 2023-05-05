// import type { AxiosError, AxiosRequestConfig } from 'axios';
import { api } from 'src/boot/axios';
import { AxiosResponse } from 'axios';

class CartService {
    async addToCart(data: string): Promise<any> {
        return await api
            .post<AxiosResponse>('api/user_cart', JSON.parse(data))
            .then((response) => response.data)
            .catch((error) => {
                console.log(error);
            });
    }

    async getCartByOrderId(orderId: number): Promise<any> {
        return await api
            .get<AxiosResponse>(`api/user_cart/${orderId}`)
            .then((response) => response.data)
            .catch((error) => {
                console.log(error);
            });
    }

    async deleteCartItem(cartItemId: number): Promise<any> {
        return await api
            .delete<AxiosResponse>('api/user_cart/' + cartItemId)
            .then((response) => response.data)
            .catch((error) => {
                console.log(error);
            });
    }
}

export default new CartService();
