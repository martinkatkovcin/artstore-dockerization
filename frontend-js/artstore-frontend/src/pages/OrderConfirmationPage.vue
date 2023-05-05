<template>
    <q-page class="row items-center justify-center">
        <div style="width: 70%">
            <h1 class="q-mb-md q-mt-md">Thank you! 💛</h1>

            <div class="row q-mb-md q-mt-md">
                <q-btn
                        push
                        class="q-ma-sm"
                        unelevated
                        color="secondary"
                        text-color="white"
                        label="Return to main page"
                        @click="$router.push('/')"
                />
            </div>
        </div>
    </q-page>
</template>


<script setup lang="ts">
import { useOrderStore } from 'stores/order-store';

const orderStore = useOrderStore();
</script>

<style lang="scss">
p {
  padding-top: 10px;
}
</style>
