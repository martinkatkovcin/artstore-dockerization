const db = require('../models/index.js');
const Order = db.orders;

const kafka = require('kafka-node');
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:29092' });

const Consumer = kafka.Consumer;
const consumer = new Consumer(client,
  [ { topic: 'order', partition: 0 } ],
  { autoCommit: false },
);

const Producer = kafka.Producer;
const producer = new Producer(client);

consumer.on('message', (message) => {
  const data = JSON.parse(String(message.value));

  if (data.op === 'create') {
    const order = {
      first_name: data.first_name ? data.first_name : null,
      last_name: data.last_name ? data.last_name : null,
      email: data.email ? data.email : null,
      phone_number: data.phone_number ? data.phone_number : null,
      address: data.address ? data.address : '',
      city: data.city ? data.city : '',
      zip_code: data.zip_code ? data.zip_code : '',
      finished: data.finished ? data.finished : false,
      payment_method_id: data.payment_method_id ? data.payment_method_id : 1,
      delivery_method_id: data.delivery_method_id ? data.delivery_method_id : 1,
      user_id: data.user_id ? data.user_id : null,
      voucher_id: data.voucher_id ? data.voucher_id : null,
    };

    Order.create(order).then(() => {
      const req = {
        event: 'delivery',
      };

      const payloads = [
        { topic: 'common', messages: JSON.stringify(req) },
      ];

      producer.send(payloads, (err, data) => {
        console.log(data);
      });
    });
  }
  else if (data.op === 'shipping') {
    const order = {
      first_name: data.first_name ? data.first_name : null,
      last_name: data.last_name ? data.last_name : null,
      email: data.email ? data.email : null,
      phone_number: data.phone_number ? data.phone_number : null,
      address: data.address ? data.address : '',
      city: data.city ? data.city : '',
      zip_code: data.zip_code ? data.zip_code : '',
      finished: data.finished ? data.finished : false,
      payment_method_id: data.payment_method_id ? data.payment_method_id : 1,
      delivery_method_id: data.delivery_method_id ? data.delivery_method_id : 1,
      user_id: data.user_id ? data.user_id : null,
      voucher_id: data.voucher_id ? data.voucher_id : null,
    };

    Order.update(order, {
      where: { id: data.id }
    }).then(() => {
      const req = {
        event: 'delivery',
      };

      const payloads = [
        { topic: 'common', messages: JSON.stringify(req) },
      ];

      producer.send(payloads, (err, data) => {
        console.log(data);
      });
    });
  }
  else if (data.op === 'add-delivery-method') {
    const deliveryMethod = {
      delivery_method_id: data.delivery_method_id,
    };

    Order.update(deliveryMethod, {
      where: { id: data.id }
    }).then(() => {
      const req = {
        event: 'payment',
      };

      const payloads = [
        { topic: 'common', messages: JSON.stringify(req) },
      ];

      producer.send(payloads, (err, data) => {
        console.log(data);
      });
    });
  }
  else if (data.op === 'add-payment-method') {
    const paymentMethod = {
      payment_method_id: data.payment_method_id,
    };

    Order.update(paymentMethod, {
      where: { id: data.id }
    });
  }
  else if (data.op === 'add-voucher') {
    const voucher = {
      voucher_id: data.voucher_id,
    };

    Order.update(voucher, {
      where: { id: data.id }
    });
  }
  else if (data.op === 'delete') {
    Order.destroy({
      where: { id: data.id }
    });
  }
});
