<template>
  <q-page class="row justify-center">
    <div style="width: 70%">
      <div>
        <q-btn
          @click="$router.push('/')"
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
      <h2 class="q-mb-md q-mt-md">Shipping information</h2>
      <q-input
        outlined
        v-model="firstName"
        label="First name"
        class="q-mb-md"
      />
      <q-input
        outlined
        v-model="lastName"
        label="Last name"
        class="q-mb-md"
      />
      <q-input
        outlined
        v-model="email"
        label="E-mail"
        class="q-mb-md"
      />
      <q-input
        outlined
        v-model="phoneNumber"
        label="Phone number"
        class="q-mb-md"
      />
      <q-input
        outlined
        v-model="address"
        label="Address"
        class="q-mb-md"
      />
      <q-input
        outlined
        v-model="city"
        label="City"
        class="q-mb-md"
        value="dsadsa"
      />
      <q-input
        outlined
        v-model="zipCode"
        type="number"
        label="ZIP"
        class="q-mb-md"
      />
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
import { computed, ref, watchEffect } from 'vue';
import { useOrderStore } from 'stores/order-store';
import { useUserStore } from 'stores/user-store';
import { useRouter } from 'vue-router';
import { Notify } from 'quasar';

const orderStore = useOrderStore();
const userStore = useUserStore();
const router = useRouter();

const user = computed<any>(() => userStore.activeUser);
const order = computed<any>(() => orderStore.order);
const userId = localStorage.getItem('logged_user_id');
userStore.fetchUser(Number(userId));
orderStore.fetchActivateOrder(Number(userId));


const firstName = ref('');
const lastName = ref('');
const email = ref( '');
const phoneNumber = ref( '');
const address = ref('');
const city = ref(  '');
const zipCode = ref( 11112);

watchEffect(() => {
    firstName.value = user.value.first_name || order.value.first_name || '';
    lastName.value = user.value.last_name || order.value.last_name || '';
    email.value = user.value.email || order.value.email || '';
    phoneNumber.value = user.value.phone_number || order.value.phone_number || '';
    address.value = order.value.address || '';
    city.value = order.value.city || '';
    zipCode.value = order.value.zip_code || 11112;
});

function submit() {
  let camundaData = {
    variables: {
      first_name: {
        value: firstName.value,
        type: 'String',
      },
      last_name: {
        value: lastName.value,
        type: 'String',
      },
      email: {
        value: email.value,
        type: 'String',
      },
      phone_number: {
        value: phoneNumber.value,
        type: 'String',
      },
      address: {
        value: address.value,
        type: 'String',
      },
      city: {
        value: city.value,
        type: 'String',
      },
      zip_code: {
        value: zipCode.value,
        type: 'Integer',
      },
      delivery_method_id: {
        value: 1,
        type: 'Integer',
      },
      payment_method_id: {
        value: 1,
        type: 'Integer'
      },
      voucher_id: {
        value: null,
        type: 'Integer'
      },
      finished: {
        value: false,
        type: 'Boolean'
      },
    },
    businessKey: '',
  };

  const kafkaData = {
    id: order.value.id,
    first_name: firstName.value,
    last_name: lastName.value,
    email: email.value,
    phone_number: phoneNumber.value,
    address: address.value,
    city: city.value,
    zip_code: zipCode.value,
    op: 'shipping',
  };

  const data = {
    first_name: firstName.value,
    last_name: lastName.value,
    email: email.value,
    phone_number: phoneNumber.value,
    address: address.value,
    city: city.value,
    zip_code: zipCode.value,
  };

  //orderStore.submitForm(JSON.stringify(camundaData)).then(() =>
    //orderStore.fetchTasks().then(() =>
      //orderStore.completeTask().then(() =>
        //orderStore.fetchTasks().then(() => router.push('/order/delivery'))
      //)
    //)
  //);

  orderStore.updateOrder(order.value.id, JSON.stringify(data));

  //orderStore.kafkaUpdateOrder(JSON.stringify(kafkaData));
}

function checkData() {
  const unregistered = (firstName.value !== '' && lastName.value !== '' && email.value !== '' && phoneNumber.value !== '');
  if ((userStore.activeUser === null && unregistered) || userStore.activeUser !== null) {
    if (address.value !== '' && city.value !== '' && zipCode.value !== 0) {
      submit();
      router.push('/order/delivery')
    }
    else {
          Notify.create({
              message: 'You have some empty values',
              position: 'top',
              type: 'negative',
          });
      }
  }
}
</script>

<style lang="scss">

</style>
