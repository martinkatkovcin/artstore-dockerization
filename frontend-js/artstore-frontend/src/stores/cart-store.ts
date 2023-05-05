import { defineStore } from 'pinia';
import CartService from 'src/services/CartService';
import {Cart} from 'src/models/Cart';
import CommonService from 'src/services/CommonService';

export const useCartStore = defineStore('cartStore', {
    state: () => ({
        user_cart: {} as Cart,
        cart_items: [] as Array<any>,
    }),
    getters: {},
    actions: {
        async addProductUserCart(data: any) {
            return CartService.addToCart(data).then((res) => {
                console.log(res);
            });
        },

        async fetchCartOrderId(orderId: any) {
            return CartService.getCartByOrderId(orderId).then((res) => {
                this.cart_items = res;
                console.log(res);
            });
        },

        async deleteCartItem(cartItemId: number) {
            return CartService.deleteCartItem(cartItemId).then((res) => {
                console.log(res);
            });
        },
    },



});
