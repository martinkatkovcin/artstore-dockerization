<template>

    <div style="margin-left: 10px; margin-top: 20px;">
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

    <div>
        <div class="row bg-white q-mt-sm">
            <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
                <div class="q-pa-md display: flex" style="height: 680px; width: 100%;">

                    <q-img
                        cover
                        :src="'http://localhost:8081/' + product.image_path + '?t=' + Date.now()"
                        style="height: 85%; width: 100%; object-fit: contain;"
                    />
                </div>
            </div>
            <div class="col-lg-7 col-md-7 col-sm-12 col-xs-12">
                <div class="row">
                    <div class="col-lg-7 col-md-7 col-sm-12 col-xs-12" :class="$q.platform.is.desktop ? '' : 'q-px-md'">
                        <div class="text-subtitle1 text-grey-10 q-mt-sm q-pt-xs" style="font-size: 50px; font-weight: bold; margin-top: 20px;">
                            {{ product.title }}
                        </div>

                        <div>
                            <div class="text-caption  text-weight-bolder q-mt-sm">Description</div>
                            <span class="text-h6" >{{product.description}}</span>
                        </div>

                        <div>
                            <div class="text-caption  text-weight-bolder q-mt-sm">Product Material</div>
                            <span class="text-h6" >{{productMaterials[product.product_material_id - 1]?.name}}</span>
                        </div>
                        <div>
                            <div class="text-caption  text-weight-bolder q-mt-sm">Product topic</div>
                            <span class="text-h6" >{{productTopics[product.product_topic_id - 1]?.name}}</span>
                        </div>
                        <div>
                            <div class="text-caption  text-weight-bolder q-mt-sm">Product period</div>
                            <span class="text-h6" >{{productPeriods[product.product_period_id - 1]?.name}}</span>
                        </div>
                        <div>
                            <div class="text-caption text-green-8 text-weight-bolder q-mt-sm">Price</div>
                            <span class="text-h6" >{{product.price}} €</span>
                        </div>
                        <div class="q-mt-md">
                            <q-btn class="q-mt-md" color="blue-9" icon="shopping_cart" label="Add to cart" @click="addToCart"/>
                        </div>
                    </div>
                </div>

                <!--</q-scroll-area>-->
            </div>
        </div>
        <div class="row q-mt-sm">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {useCommonStore} from 'stores/common-store';
import {useOrderStore} from 'stores/order-store';
import {computed, ref, onMounted} from 'vue';
import { useRoute } from 'vue-router';
import {Notify} from 'quasar';
import {useAuthStore} from 'stores/auth-store';
import {useCartStore} from 'stores/cart-store';

const authStore = useAuthStore();
const user = computed<any>(() => authStore.user);

const route = useRoute();
const productDetailStore = useCommonStore();

const productMaterialsStore = useCommonStore();
productMaterialsStore.fetchProductMaterials();

const productTopicsStore = useCommonStore();
productTopicsStore.fetchProductTopics();

const productPeriodsStore = useCommonStore();
productPeriodsStore.fetchProductPeriods();

const productTopics = computed<any>(() => productTopicsStore.productTopics);
const productMaterials = computed<any>(() => productMaterialsStore.productMaterials);
const productPeriods = computed<any>(() => productPeriodsStore.productPeriods);

const commonStore = useCommonStore();
const product = computed<any>(() => commonStore.product);

productDetailStore.fetchProduct(route.params.id);



const orderStore = useOrderStore();
const order = computed<any>(() => orderStore.order);
const userId = localStorage.getItem('logged_user_id');
orderStore.fetchActivateOrder(parseInt(userId));


const cartStore = useCartStore();

function addToCart() {
    orderStore.fetchActivateOrder(parseInt(userId));

    const data = JSON.stringify({
        'order_id': order.value.id,
        'product_id': product.value.id
    });
    cartStore.addProductUserCart(data);
    Notify.create({
        message: 'Product added to cart',
        position: 'top',
        type: 'positive',
    });
}


</script>

<style scoped>

</style>
