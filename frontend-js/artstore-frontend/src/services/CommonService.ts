// import type { AxiosError, AxiosRequestConfig } from 'axios';
import { api } from 'src/boot/axios';
import { AxiosResponse } from 'axios';

class CommonService {
  async getDeliveryMethods(): Promise<any> {
    return await api
      .get<AxiosResponse>('api/delivery-methods')
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  }

  async postDeliveryMethod(data: string): Promise<any> {
    return await api
      .post<AxiosResponse>('api/delivery-methods', data)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  }

  async updateDeliveryMethod(deliveryMethodId: number, data: string): Promise<any> {
    return await api
      .put<AxiosResponse>('api/delivery-methods/' + deliveryMethodId, data)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  }

  async deleteDeliveryMethod(deliveryMethodId: number): Promise<any> {
    return await api
      .delete<AxiosResponse>('api/delivery-methods/' + deliveryMethodId)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  }

  async getPaymentMethods(): Promise<any> {
    return await api
      .get<AxiosResponse>('api/payment-methods')
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  }


    async getVouchers(): Promise<any> {
        return await api
            .get<AxiosResponse>('api/vouchers')
            .then((response) => response.data)
            .catch((error) => {
                console.log(error);
            });
    }

  async postPaymentMethod(data: string): Promise<any> {
    return await api
      .post<AxiosResponse>('api/payment-methods', data)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  }

  async updatePaymentMethod(paymentMethodId: number, data: string): Promise<any> {
    return await api
      .put<AxiosResponse>('api/payment-methods/' + paymentMethodId, data)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  }

  async deletePaymentMethod(paymentMethodId: number): Promise<any> {
    return await api
      .delete<AxiosResponse>('api/payment-methods/' + paymentMethodId)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  }

  async getProductPeriods(): Promise<any> {
    return await api
      .get<AxiosResponse>('api/product-periods')
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  }

    async getProducts(): Promise<any> {
        return await api
            .get<AxiosResponse>('api/products')
            .then((response) => response.data)
            .catch((error) => {
                console.log(error);
            });
    }

    async getProductsSorted(): Promise<any> {
        return await api
            .get<AxiosResponse>('api/products/sorted')
            .then((response) => response.data)
            .catch((error) => {
                console.log(error);
            });
    }

  async postProductPeriod(data: string): Promise<any> {
    return await api
      .post<AxiosResponse>('api/product-periods', data)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  }

    async getImage(image_name: string): Promise<any> {
        return await api
            .get<AxiosResponse>(`api/products/image/${image_name}`)
            .then((response) => response.data)
            .catch((error) => {
                console.log(error);
            });
    }

  async updateProductPeriod(productPeriodId: number, data: string): Promise<any> {
    return await api
      .put<AxiosResponse>('api/product-periods/' + productPeriodId, data)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  }

  async deleteProductPeriod(productPeriodId: number): Promise<any> {
    return await api
      .delete<AxiosResponse>('api/product-periods/' + productPeriodId)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  }

  async getProductTopics(): Promise<any> {
    return await api
      .get<AxiosResponse>('api/product-topics')
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  }

  async postProductTopic(data: string): Promise<any> {
    return await api
      .post<AxiosResponse>('api/product-topics', data)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  }

    async getProduct(productId: number): Promise<any> {
        return await api
            .get<AxiosResponse>(`api/products/${productId}`)
            .then((response) => response.data)
            .catch((error) => {
                console.log(error);
            });
    }

  async updateProductTopic(productTopicId: number, data: string): Promise<any> {
    return await api
      .put<AxiosResponse>('api/product-topics/' + productTopicId, data)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  }

  async deleteProductTopic(productTopicId: number): Promise<any> {
    return await api
      .delete<AxiosResponse>('api/product-topics/' + productTopicId)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  }

  async getProductMaterials(): Promise<any> {
    return await api
      .get<AxiosResponse>('api/product-materials')
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  }

  async postProductMaterial(data: string): Promise<any> {
    return await api
      .post<AxiosResponse>('api/product-materials', data)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  }

  async updateProductMaterial(productMaterialId: number, data: string): Promise<any> {
    return await api
      .put<AxiosResponse>('api/product-materials/' + productMaterialId, data)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  }

  async deleteProductMaterial(productMaterialId: number): Promise<any> {
    return await api
      .delete<AxiosResponse>('api/product-materials/' + productMaterialId)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  }

  async getCamundaVariables(processId: string): Promise<any> {
    return await api
      .get<AxiosResponse>(`engine-rest/process-instance/${processId}/variables`)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  }
}

export default new CommonService();
