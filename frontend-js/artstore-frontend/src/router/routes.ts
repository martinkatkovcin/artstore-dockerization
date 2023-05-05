import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/HomepageLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
  path: '/register',
  component: () => import('layouts/MainLayout.vue'),
  children: [{ path: '', component: () => import('pages/RegisterPage.vue') }],
  },
  {
  path: '/login',
  component: () => import('layouts/MainLayout.vue'),
  children: [{ path: '', component: () => import('pages/LoginPage.vue') }],
  },
  {
    path: '/order/shipping',
    component: () => import('layouts/AppLayout.vue'),
    children: [{ path: '', component: () => import('pages/OrderShippingPage.vue') }],
  },
  {
  path: '/productDetail/:id',
    component: () => import('layouts/AppLayout.vue'),
    children: [{ path: '', component: () => import('pages/ProductDetailPage.vue') }],
  },

  {
  path: '/shopping_cart',
    component: () => import('layouts/AppLayout.vue'),
    children: [{ path: '', component: () => import('pages/CartPage.vue') }],
  },

  {
    path: '/order/delivery',
    component: () => import('layouts/AppLayout.vue'),
    children: [{ path: '', component: () => import('pages/OrderDeliveryPage.vue') }],
  },

  {
    path: '/order/payment',
    component: () => import('layouts/AppLayout.vue'),
    children: [{ path: '', component: () => import('pages/OrderPaymentPage.vue') }],
  },
  {
    path: '/order/summary',
    component: () => import('layouts/AppLayout.vue'),
    children: [{ path: '', component: () => import('pages/OrderSummaryPage.vue') }],
  },
  {
    path: '/order/confirmation',
    component: () => import('layouts/AppLayout.vue'),
    children: [{ path: '', component: () => import('pages/OrderConfirmationPage.vue') }],
  },



  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
