/*
import { KafkaMessage } from 'kafkajs';
const { Kafka } = require('kafkajs');
const kafka = new Kafka({
  clientId: 'artstore',
  brokers: ['localhost:29092']
})

const deliveryConsumer = kafka.consumer({ groupId: 'delivery-consumer' });
const paymentConsumer = kafka.consumer({ groupId: 'payment-consumer' });


class KafkaCommonService {
  async getDeliveryMethods(): Promise<any> {
    await deliveryConsumer.connect();
    await deliveryConsumer.subscribe({ topic: 'delivery-method', fromBeginning: true });

    await deliveryConsumer.run({
      eachMessage: async ({ topic, partition, message }:
                            {topic: string; partition: number; message: KafkaMessage }) => {
        if (message.value !== null)
          return JSON.parse(message.value.toString());
      },
    })
  }

  async getPaymentMethods(): Promise<any> {
    await paymentConsumer.connect();
    await paymentConsumer.subscribe({ topic: 'payment-method', fromBeginning: true });

    await paymentConsumer.run({
      eachMessage: async ({ topic, partition, message }:
                            {topic: string; partition: number; message: KafkaMessage }) => {
        if (message.value !== null)
          return JSON.parse(message.value.toString());
      },
    })
  }
}

export default new KafkaCommonService();
*/
