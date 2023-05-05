const db = require('../models/index.js');
const DeliveryMethod = db.delivery_methods;
const PaymentMethod = db.payment_methods;

const kafka = require('kafka-node');
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:29092' });

const Producer = kafka.Producer;
const producer = new Producer(client);

const Consumer = kafka.Consumer;
const consumer = new Consumer(client,
  [ { topic: 'common', partition: 0 } ],
  { autoCommit: false },
);

consumer.on('message', (message) => {
  const data = JSON.parse(String(message.value));

  if (data.event === 'delivery') {
    DeliveryMethod.findAll().then((res) => {
      const payloads = [
        { topic: 'delivery-method', messages: JSON.stringify(res) },
      ];

      producer.send(payloads, (err, data) => {
        console.log(data);
      });
    });
  }
  else if (data.event === 'payment') {
    PaymentMethod.findAll().then((res) => {
      const payloads = [
        { topic: 'payment-method', messages: JSON.stringify(res) },
      ];

      producer.send(payloads, (err, data) => {
        console.log(data);
      });
    });
  }
});
