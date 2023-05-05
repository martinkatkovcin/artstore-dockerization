/**
 * Simulation file in case the frontent implementation of Kafka doesn't work due to dependency error
 */

const db = require('../models/index.js');

const kafka = require('kafka-node');
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:29092' });
const client2 = new kafka.KafkaClient({ kafkaHost: 'localhost:29092' });

const Consumer = kafka.Consumer;
const deliveryConsumer = new Consumer(client,
  [ { topic: 'delivery-method', partition: 0 } ],
  { autoCommit: false },
);
const paymentConsumer = new Consumer(client2,
  [ { topic: 'payment-method', partition: 0 } ],
  { autoCommit: false },
);
const Producer = kafka.Producer;
const producer = new Producer(client);

const order = {
  first_name: 'm',
  last_name: 'h',
  email: 'mh@mh.sk',
  phone_number: '0900000000',
  address: 'k',
  city: 'k',
  zip_code: '12345',
  op: 'create',
};

let payloads = [
  { topic: 'order', messages: JSON.stringify(order) },
];

producer.on('ready', () => {
  producer.send(payloads, (err, data) => {
    console.log(data);
  });
});

deliveryConsumer.on('message', (message) => {
  console.log('Delivery methods:');
  console.log(JSON.parse(String(message.value)));

  const res = {
    id: 1,
    delivery_method_id: 3,
    op: 'add-delivery-method',
  }

  payloads = [
    { topic: 'order', messages: JSON.stringify(res) },
  ];

  producer.send(payloads, (err, data) => {
    console.log(data);
  });
});

paymentConsumer.on('message', (message) => {
  console.log('Payment methods:');
  console.log(JSON.parse(String(message.value)));

  const res = {
    id: 1,
    payment_method_id: 4,
    op: 'add-payment-method',
  }

  payloads = [
    { topic: 'order', messages: JSON.stringify(res) },
  ];

  producer.send(payloads, (err, data) => {
    console.log(data);
  });
});
