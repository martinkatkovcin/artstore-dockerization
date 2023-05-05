<template>
  <q-page class="row justify-center">
    <div style="width: 70%">
      <div>
        <q-btn
          @click="$router.push('/order/payment')"
          push
          color="secondary"
          icon="arrow_back"
          align="center"
          class="q-mt-md"
        >
          <div>Return</div>
          <div>{{ $route.params.title }}</div>
        </q-btn>
      </div>
      <h2 class="q-mb-md q-mt-md">Summary</h2>
      <p><b>First name:</b> {{ firstName }}</p>
      <p><b>Last name:</b> {{ lastName }}</p>
      <p><b>E-mail:</b> {{ email }}</p>
      <p><b>Phone number:</b> {{ phoneNumber }}</p>
      <q-separator />

      <p><b>Address:</b> {{ address }}</p>
      <p><b>City:</b> {{ city }}</p>
      <p><b>Zip code:</b> {{ zipCode }}</p>
      <q-separator />

      <p><b>Delivery method:</b> {{ deliveryMethods[getDeliveryMethodIndex(deliveryId)]?.name }}</p>
      <p><b>Payment method:</b> {{ paymentMethods[getPaymentMethodIndex(paymentId)]?.name }}</p>

      <q-input
        outlined
        v-model="voucher"
        label="Voucher code (optional, leave empty)"
        class="q-mb-md"
      />

        <p><b>Final price:</b> {{ totalPrice }} €</p>
        <p v-if="getVoucherIndex(voucherIdRef) != -1"><b>Final price with voucher:</b> {{ (parseFloat(totalPrice) * (1 - vouchers[getVoucherIndex(voucherIdRef)]?.discount).toFixed(2)) }} €</p>

        <div class="row justify-end q-mb-md q-mt-md">
        <q-btn
          push
          class="q-ma-sm"
          unelevated
          color="secondary"
          text-color="white"
          label="Proceed"
          @click="checkData"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import {computed, ref, watchEffect, watch} from 'vue';
import { useOrderStore } from 'stores/order-store';
import { useCommonStore } from 'stores/common-store';
import { useRouter } from 'vue-router';
import {useUserStore} from 'stores/user-store';
import {Notify} from 'quasar';

const orderStore = useOrderStore();
const commonStore = useCommonStore();
const router = useRouter();
const userStore = useUserStore();

const firstName = ref('');
const lastName = ref('');
const email = ref( '');
const phoneNumber = ref( '');
const address = ref('');
const city = ref(  '');
const zipCode = ref( 1);
const deliveryId = ref( 1);
const paymentId = ref( 1);
const voucher = ref('');
const voucherIdRef = ref(0);
const voucherIndexRef = ref(-1);


const order = computed<any>(() => orderStore.order);
const paymentMethods = computed<any>(() => commonStore.paymentMethods);
const vouchers = computed<any>(() => commonStore.vouchers);
const deliveryMethods = computed<any>(() => commonStore.deliveryMethods);
const userId = localStorage.getItem('logged_user_id');
userStore.fetchUser(userId);
orderStore.fetchActivateOrder(parseInt(userId));
commonStore.fetchDeliveryMethods();
commonStore.fetchPaymentMethods();
commonStore.fetchVouchers();

const totalPrice = localStorage.getItem('total_price');

watchEffect(() => {
    firstName.value = order.value.first_name;
    lastName.value = order.value.last_name;
    email.value = order.value.email;
    phoneNumber.value = order.value.phone_number;
    address.value = order.value.address;
    city.value = order.value.city;
    zipCode.value = order.value.zip_code;
    deliveryId.value = order.value.delivery_method_id;
    paymentId.value = order.value.payment_method_id;
});

const getDeliveryMethodIndex = computed(() => {
    return (deliveryId: number): number => {
        const index = deliveryMethods.value.findIndex(p => p.id == deliveryId);
        return index;
    };
});

const getPaymentMethodIndex = computed(() => {
    return (paymentId: number): number => {
        const index = paymentMethods.value.findIndex(p => p.id == paymentId);
        return index;
    };
});

const getVoucherIndex = computed(() => {
    return (voucherId: number): number => {
        const index = vouchers.value.findIndex(p => p.id == voucherId);
        return index;
    };
});


//orderStore.fetchTasks().then(() => orderStore.fetchVariables());

function submit() {

    const voucherCode = voucher.value;

  let data = {
    modifications: {
      voucher_id: {
        value: voucher.value,
        type: 'String',
      },
    }
  };


  //orderStore.voucher = voucher.value;

    const data_body = JSON.stringify({
        'voucher_id': voucherCode !== '' ? voucherIdRef.value : null,
        'finished': true
    });

    orderStore.updateOrder(order.value.id, data_body);

    Notify.create({
        message: 'Order was processed',
        position: 'top',
        type: 'positive',
    });

    router.push('/order/confirmation');

  //orderStore.updateVariables(JSON.stringify(data)).then(() =>
    //orderStore.completeTask().then(() =>
      //orderStore.fetchTasks().then(() => router.push('/order/confirmation'))
    //)
  //);
}



watch(voucher, (newValue) => {
    const voucherIndex = vouchers.value.findIndex(v => v.code == newValue);
    if (voucherIndex == -1) {
        voucherIndexRef.value = -1;
        return;
    }

    const voucherId = vouchers.value[voucherIndex].id;
    voucherIdRef.value = voucherId;
    voucherIndexRef.value = voucherIndex;


});

function checkData() {

    const voucherCode = voucher.value;
    console.log(voucherCode)
    console.log(voucherIndexRef.value)

    if (voucherIndexRef.value == -1 && voucherCode != '') {
        Notify.create({
            message: 'Invalid voucher',
            position: 'top',
            type: 'negative',
        })
        return;
    };

    submit();
}
</script>

<style lang="scss">
p {
  padding-top: 10px;
}
</style>
