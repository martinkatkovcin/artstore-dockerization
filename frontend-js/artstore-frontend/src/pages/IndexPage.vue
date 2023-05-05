<template>
  <q-page class="q-mt-sm">
    <div class="col-lg-10 col-md-10 col-sm-12 col-xs-12">
      <q-carousel
        :class="$q.platform.is.desktop ? 'q-ml-sm' : ''"
        swipeable
        animated
        thumbnails
        infinite
        arrows
        v-model="slide"
        height="250px"
      >
        <q-carousel-slide
          :name="1"
          img-src="https://images.theconversation.com/files/339504/original/file-20200603-130907-asv1yo.jpg"
        />
        <q-carousel-slide
          :name="2"
          img-src="https://greensoncouncil.wp.greens.org.au/wp-content/uploads/sites/72/2021/11/art-auction-10e3hqz.jpg"
        />
        <q-carousel-slide
          :name="3"
          img-src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Vincent_van_Gogh_-_Road_with_Cypress_and_Star_-_c._12-15_May_1890.jpg/1200px-Vincent_van_Gogh_-_Road_with_Cypress_and_Star_-_c._12-15_May_1890.jpg"
        />
      </q-carousel>
    </div>

    <div class="text-grey-9 text-weight-bold">
      <div class="row items-center q-mx-sm">
        <div class="col-12 q-mt-sm">
          <div class="q-pl-md bg-white q-pt-sm">
            <span class="text-grey-9 text-h6 text-weight-bold"
              >Newest products</span
            >
          </div>
          <div class="card-container">
            <q-card
              v-for="(product, index) in products"
              :key="index"
              class="my-card"
              @click="$router.push(`/productDetail/${product.id}`)"
              push
            >
              <q-img
                :style="{ height: '250px', width: '250px' }"
                :src="'http://localhost:8081/' + product.image_path"
              />

              <q-card-section>
                <div class="text-h6">{{ product.title }}</div>
                <div class="text-subtitle1">
                  <strong>{{ product.price }} €</strong>
                </div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                {{ product.description }}
              </q-card-section>
              <q-card-section class="q-pt-none">
                {{ productPeriods[product.product_period_id - 1]?.name }}
              </q-card-section>
              <q-card-section class="q-pt-none">
                {{ productTopics[product.product_topic_id - 1]?.name }}
              </q-card-section>
              <q-card-section class="q-pt-none">
                {{ productMaterials[product.product_material_id - 1]?.name }}
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useCommonStore } from 'stores/common-store';
import { Product } from 'src/models/Product';
import { useAuthStore } from 'stores/auth-store';
import { useOrderStore } from 'stores/order-store';

const authStore = useAuthStore();
const user = computed<any>(() => authStore.user);

const slide = ref(1);
const productsStore = useCommonStore();
productsStore.fetchProductsSorted();

const productMaterialsStore = useCommonStore();
productMaterialsStore.fetchProductMaterials();

const productTopicsStore = useCommonStore();
productTopicsStore.fetchProductTopics();

const productPeriodsStore = useCommonStore();
productPeriodsStore.fetchProductPeriods();

const products = computed<Product[]>(() => productsStore.products);
const productTopics = computed<any>(() => productTopicsStore.productTopics);
const productMaterials = computed<any>(
  () => productMaterialsStore.productMaterials
);
const productPeriods = computed<any>(() => productPeriodsStore.productPeriods);

const orderStore = useOrderStore();
const order = computed<any>(() => orderStore.order);
const userId = localStorage.getItem('logged_user_id');

if (userId) {
  orderStore.fetchActivateOrder(parseInt(userId));
}
</script>

<style lang="sass" scoped>
.custom-caption
  text-align: center
  padding: 8px
  color: white
  background-color: rgba(0, 0, 0, .3)

.my-card
  width: 100%
  max-width: 250px
  max-height: 600px

.card-container
  display: grid
  grid-template-columns: repeat(7, 1fr) /* display 7 columns */
  grid-template-rows: 1fr /* display 7 rows */
  overflow-y: hidden
  grid-gap: 16px /* add some space between the cards */
  height: 500px
  max-height: 500px
  margin-top: 30px
  margin-left: 30px
  margin-right: 30px
</style>
