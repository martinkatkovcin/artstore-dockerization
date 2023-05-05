import { defineStore } from 'pinia';
import CommonService from 'src/services/CommonService';
//import KafkaCommonService from 'src/services/KafkaCommonService';

import { PaymentMethod } from 'src/models/PaymentMethod';
import { DeliveryMethod } from 'src/models/DeliveryMethod';
import { ProductTopic } from 'src/models/ProductTopic';
import { ProductMaterial } from 'src/models/ProductMaterial';
import { ProductPeriod } from 'src/models/ProductPeriod';

export const useCommonStore = defineStore('commonStore', {
  state: () => ({
    deliveryMethods: [] as Array<DeliveryMethod>,
    paymentMethods: [] as Array<PaymentMethod>,
    productTopics: [] as Array<ProductTopic>,
    productPeriods: [] as Array<ProductPeriod>,
    productMaterials: [] as Array<ProductMaterial>,
    products: [] as Array<any>,
    product: [],
    image: new Image(),
    vouchers:  [] as Array<any>
  }),
  getters: {},
  actions: {
    async fetchDeliveryMethods() {
      return CommonService.getDeliveryMethods().then((res) => {
        this.deliveryMethods = res;
      });
    },

    /*async kafkaFetchDeliveryMethods() {
      return KafkaCommonService.getDeliveryMethods().then((res) => {
        console.log(res);
        this.deliveryMethods = res;
      });
    },*/

    async fetchVouchers() {
      return CommonService.getVouchers().then((res) => {
        console.log(res);
        this.vouchers = res;
        return res;
      });
    },

    async fetchCamundaDeliveryMethods(processId: string) {
      return CommonService.getCamundaVariables(processId).then((res) => {
        this.deliveryMethods = JSON.parse(res.delivery_methods.value);
      });
    },

    async fetchProducts() {
      return CommonService.getProducts().then((res) => {
        this.products = res;
      });
    },

    async fetchProductsSorted() {
      return CommonService.getProductsSorted().then((res) => {
        this.products = res;
      });
    },

    async fetchProduct(productId: any) {
      return CommonService.getProduct(productId).then((res) => {
        this.product = res;
        console.log(res);
      });
    },

    async registerDeliveryMethod(data: any) {
      return CommonService.postDeliveryMethod(data).then((res) => {
        console.log(res);
      });
    },

    async updateDeliveryMethod(deliveryMethodId: number, data: any) {
      return CommonService.updateDeliveryMethod(deliveryMethodId, data).then((res) => {
        console.log(res);
      });
    },

    async deleteDeliveryMethod(deliveryMethodId: number) {
      return CommonService.deleteDeliveryMethod(deliveryMethodId).then((res) => {
        console.log(res);
      });
    },

    async fetchPaymentMethods() {
      return CommonService.getPaymentMethods().then((res) => {
        this.paymentMethods = res;
      });
    },

    /*async kafkaFetchPaymentMethods() {
      return KafkaCommonService.getPaymentMethods().then((res) => {
        console.log(res);
        this.paymentMethods = res;
      });
    },*/

    async fetchCamundaPaymentMethods(processId: string) {
      return CommonService.getCamundaVariables(processId).then((res) => {
        this.paymentMethods = JSON.parse(res.payment_methods.value);
      });
    },

    async registerPaymentMethod(data: any) {
      return CommonService.postPaymentMethod(data).then((res) => {
        console.log(res);
      });
    },

    async updatePaymentMethod(paymentMethodId: number, data: any) {
      return CommonService.updatePaymentMethod(paymentMethodId, data).then((res) => {
        console.log(res);
      });
    },

    async deletePaymentMethod(paymentMethodId: number) {
      return CommonService.deletePaymentMethod(paymentMethodId).then((res) => {
        console.log(res);
      });
    },

    async fetchProductPeriods() {
      return CommonService.getProductPeriods().then((res) => {
        this.productPeriods = res;
        console.log(res);
      });
    },

    async registerProductPeriod(data: any) {
      return CommonService.postProductPeriod(data).then((res) => {
        console.log(res);
      });
    },

    async updateProductPeriod(productPeriodId: number, data: any) {
      return CommonService.updateProductPeriod(productPeriodId, data).then((res) => {
        console.log(res);
      });
    },

    async deleteProductPeriod(productPeriodId: number) {
      return CommonService.deleteProductPeriod(productPeriodId).then((res) => {
        console.log(res);
      });
    },

    async fetchProductTopics() {
      return CommonService.getProductTopics().then((res) => {
        this.productTopics = res;
        console.log(res);
      });
    },

    async registerProductTopic(data: any) {
      return CommonService.postProductTopic(data).then((res) => {
        console.log(res);
      });
    },

    async updateProductTopic(productTopicId: number, data: any) {
      return CommonService.updateProductTopic(productTopicId, data).then((res) => {
        console.log(res);
      });
    },

    async deleteProductTopic(productTopicId: number) {
      return CommonService.deleteProductTopic(productTopicId).then((res) => {
        console.log(res);
      });
    },

    async fetchProductMaterials() {
      return CommonService.getProductMaterials().then((res) => {
        this.productMaterials = res;
        console.log(res);
      });
    },

    async registerProductMaterial(data: any) {
      return CommonService.postProductMaterial(data).then((res) => {
        console.log(res);
      });
    },

    async updateProductMaterial(productMaterialId: number, data: any) {
      return CommonService.updateProductMaterial(productMaterialId, data).then((res) => {
        console.log(res);
      });
    },

    async deleteProductMaterial(productMaterialId: number) {
      return CommonService.deleteProductMaterial(productMaterialId).then((res) => {
        console.log(res);
      });
    },

     async fetchImage(image_name: string) {
      return CommonService.getImage(image_name.replace('uploads/','')).then((res) => {
        //console.log(res);
      });
    },
  }
});
