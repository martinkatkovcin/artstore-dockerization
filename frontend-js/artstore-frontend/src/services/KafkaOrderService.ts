/*
import { api } from 'src/boot/axios';
import { AxiosResponse } from 'axios';

const { Kafka } = require('kafkajs');
const kafka = new Kafka({
  clientId: 'artstore',
  brokers: ['localhost:29092']
})

const producer = kafka.producer();

class KafkaOrderService {
  async getOrders(): Promise<any> {
    return await api
      .get<AxiosResponse>('api/orders')
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  }

  async postOrder(data: string): Promise<any> {
    await producer.connect();
    await producer.send({
      topic: 'order',
      messages: [
        { value: data }
      ],
    });
  }

  async updateOrder(data: string): Promise<any> {
    await producer.connect();
    await producer.send({
      topic: 'order',
      messages: [
        { value: data }
      ],
    });
  }

  async deleteOrder(orderId: number): Promise<any> {
    const data = {
      id: orderId,
      op: 'delete',
    };

    await producer.connect();
    await producer.send({
      topic: 'order',
      messages: [
        { value: JSON.stringify(data) }
      ],
    });
  }
}

export default new KafkaOrderService();
*/
