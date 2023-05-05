<template>
  <q-page class="row justify-center">
    <div style="width: 70%">
      <div>
        <q-btn
          @click="$router.push('/order/shipping')"
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
      <h2 class="q-mb-md q-mt-md">Delivery</h2>
        <q-select
        outlined
        v-model="selected"
        :options="options"
        label="Delivery"
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


/*
MODEL UPDATE PREC
        <q-select
        outlined
        v-model="selected"
        :options="options"
        label="Delivery"
        class="q-mb-md"
        @update:model-value="orderStore.fetchTasks()"
      />
 */

import { ref, computed, watch } from 'vue';
import { useOrderStore } from 'stores/order-store';
import { useCommonStore } from 'stores/common-store';
import { useRouter } from 'vue-router';
import { useUserStore } from 'stores/user-store';
import { Notify } from 'quasar';

const orderStore = useOrderStore();
const commonStore = useCommonStore();
const userStore = useUserStore();
const router = useRouter();

const order = computed<any>(() => orderStore.order);
const deliveryMethods = computed<any>(() => commonStore.deliveryMethods);
const userId = localStorage.getItem('logged_user_id');
userStore.fetchUser(Number(userId));
orderStore.fetchActivateOrder(Number(userId));
commonStore.fetchDeliveryMethods();

const options = computed<Array<{ label: string; value: number }>>(() =>
    commonStore.deliveryMethods.map((x) => {
        return { label: x.name, value: x.id };
    })
);

const selected = ref<{ label: string; value: number }>({
    label: '',
    value: 0,
});


watch([order, deliveryMethods], () => {
    const deliveryMethodId = order.value.delivery_method_id;
    const deliveryMethod = deliveryMethods.value.find(
        (x: any) => x.id == deliveryMethodId
    );
    selected.value.label = deliveryMethod ? deliveryMethod.name : '';
    selected.value.value = deliveryMethodId || 0;
});


//orderStore.fetchTasks().then(() => commonStore.fetchCamundaDeliveryMethods(orderStore.processId));

function submit() {
  let camundaData = {
    modifications: {
      delivery_method_id: {
        value: selected.value.value,
        type: 'Integer',
      },
    },
  };

  const kafkaData = {
    id: order.value.id,
    delivery_method_id: selected.value.value,
    op: 'add-delivery-method',
  };

  const data = {
    delivery_method_id: selected.value.value,
  };

  //orderStore.deliveryMethod = selected.value.label;

    //orderStore.updateVariables(JSON.stringify(camundaData)).then(() =>
    //orderStore.completeTask().then(() =>
      //orderStore.fetchTasks().then(() => router.push('/order/payment'))
    //)
  //);

  orderStore.updateOrder(order.value.id, JSON.stringify(data));

  //orderStore.kafkaUpdateOrder(JSON.stringify(kafkaData));
}

function checkData() {
  if (selected.value.label !== '') {
      submit();
      router.push('/order/payment');
  }
  else {
      Notify.create({
          message: 'You did not choose delivery method',
          position: 'top',
          type: 'negative',
      });
  }
}
</script>

<style lang="scss">

</style>
