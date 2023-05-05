<template>
  <q-page class="row justify-center">
    <div style="margin-right: 10px; margin-top: 20px">
      <q-btn
        @click="$router.push('/')"
        push
        color="secondary"
        icon="arrow_back"
        align="center"
      >
        <div>Return</div>
        <div>{{ $route.params.title }}</div>
      </q-btn>
    </div>

    <div style="margin-top: 20px">
      <q-list bordered separator style="width: 1300px">
        <q-item v-for="(cart_item, index) in cart" :key="index">
          <q-img
            :style="{ height: '50px', width: '50px' }"
            :src="
              'http://localhost:8081/' +
              products[getProductIndex(cart_item.product_id)].image_path
            "
          />
          <q-item-section>
            <q-item-label
              >{{ products[getProductIndex(cart_item.product_id)].title }}
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label
              >{{
                products[getProductIndex(cart_item.product_id)].price
              }}
              €</q-item-label
            >
          </q-item-section>

          <q-btn
            @click="removeCartItem(cart_item.id)"
            class="text-negative q-ma-md"
            icon="delete"
            round
            dense
          />
        </q-item>
      </q-list>

      <div
        class="total-price"
        style="
          display: flex;
          justify-content: flex-end;
          margin-top: 20px;
          font-size: 20px;
        "
      >
        Total Price: {{ totalPrice.toFixed(2) }} €
      </div>

      <div style="margin-right: 10px; margin-top: 20px">
        <q-btn
          @click="$router.push('/order/shipping')"
          push
          color="secondary"
          icon="arrow_forward"
          align="center"
        >
          <div>Shipping</div>
        </q-btn>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useCommonStore } from 'stores/common-store';
import { Product } from 'src/models/Product';
import { useAuthStore } from 'stores/auth-store';
import { useRouter } from 'vue-router';
import { useOrderStore } from 'stores/order-store';
import { useCartStore } from 'stores/cart-store';
import { Notify } from 'quasar';

const router = useRouter();

const authStore = useAuthStore();
const user = computed<any>(() => authStore.user);

const productsStore = useCommonStore();
const products = computed<Product[]>(() => productsStore.products);
productsStore.fetchProducts();

let itemRemoved = false;
const orderStore = useOrderStore();
const order = computed<any>(() => orderStore.order);
const userId = localStorage.getItem('logged_user_id');

if (userId) {
  orderStore.fetchActivateOrder(parseInt(userId));
}

const cartStore = useCartStore();
const cart = computed<any>(() => cartStore.cart_items);

watch(order, (newOrder, oldOrder) => {
  if (newOrder && newOrder.id) {
    cartStore.fetchCartOrderId(newOrder.id); // Fetch cart data
  }
});

watch(cart, (newCart, oldCart) => {
  if (itemRemoved) {
    cartStore.fetchCartOrderId(order.value.id);
    itemRemoved = false; // Reset flag
  }
});

const getProductIndex = computed(() => {
  return (productId: number): number => {
    const index = products.value.findIndex((p) => p.id == productId);
    return index;
  };
});

function getProductIndexFucn(productId: number) {
  const index = products.value.findIndex((p) => p.id == productId);
  return index;
}

function removeCartItem(cartItemId: number) {
  itemRemoved = true; // Set flag to true
  cartStore.deleteCartItem(cartItemId);
  cartStore.fetchCartOrderId(order.value.id);

  Notify.create({
    message: 'Product removed from cart',
    position: 'top',
    type: 'positive',
  });
}

const totalPrice = computed(() => {
  return cart.value.reduce((total: number, item: any) => {
    const productPrice =
      products.value[getProductIndexFucn(item.product_id)].price;
    return total + productPrice;
  }, 0);
});

const totalPriceRef = ref(totalPrice.value);
watch(totalPrice, (newValue, oldValue) => {
  totalPriceRef.value = newValue;
  localStorage.setItem('total_price', totalPriceRef.value.toFixed(2));
});
</script>
