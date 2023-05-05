const { Client, logger, Variables } = require('camunda-external-task-client-js')
const db = require('../models/index.js');
const Order = db.orders;
const DeliveryMethod = db.delivery_methods;
const PaymentMethod = db.payment_methods;

const config = { baseUrl: 'http://localhost:8080/engine-rest', use: logger, asyncResponseTimeout: 10000 };
const client = new Client(config);

client.subscribe('load-delivery-methods', {}, async function({ task, taskService }) {
  DeliveryMethod.findAll().then(async data => {
    const processVariables = new Variables().setAll({
      first_name: task.variables.get('first_name'),
      last_name: task.variables.get('last_name'),
      email: task.variables.get('email'),
      phone_number: task.variables.get('phone_number'),
      address: task.variables.get('address'),
      city: task.variables.get('city'),
      zip_code: task.variables.get('zip_code'),
      payment_method_id: task.variables.get('payment_method_id'),
      delivery_method_id: task.variables.get('delivery_method_id'),
      user_id: task.variables.get('user_id'),
      voucher_id: task.variables.get('voucher_id'),
      delivery_methods: JSON.stringify(data),
    });

    await taskService.complete(task, processVariables);
  }).catch(err => {
    console.log(err)
    taskService.handleFailure(task, {
      errorMessage: err.message || 'Some error occurred while fetching delivery methods.',
      errorDetails: 'Error code 500',
      retries: 1,
      retryTimeout: 1000
    });
  });
});

client.subscribe('load-payment-methods', {}, async function({ task, taskService }) {
  PaymentMethod.findAll().then(async data => {
    const processVariables = new Variables().setAll({
      first_name: task.variables.get('first_name'),
      last_name: task.variables.get('last_name'),
      email: task.variables.get('email'),
      phone_number: task.variables.get('phone_number'),
      address: task.variables.get('address'),
      city: task.variables.get('city'),
      zip_code: task.variables.get('zip_code'),
      payment_method_id: task.variables.get('payment_method_id'),
      delivery_method_id: task.variables.get('delivery_method_id'),
      user_id: task.variables.get('user_id'),
      voucher_id: task.variables.get('voucher_id'),
      delivery_methods: task.variables.get('delivery_methods'),
      payment_methods: JSON.stringify(data),
    });

    await taskService.complete(task, processVariables);
  }).catch(err => {
    taskService.handleFailure(task, {
      errorMessage: err.message || 'Some error occurred while fetching payment methods.',
      errorDetails: 'Error code 500',
      retries: 1,
      retryTimeout: 1000
    });
  });
});

client.subscribe('process-order', {}, async function({ task, taskService }) {
  const firstName = task.variables.get('first_name');
  const lastName = task.variables.get('last_name');
  const email = task.variables.get('email');
  const phoneNumber = task.variables.get('phone_number');
  const address = task.variables.get('address');
  const city = task.variables.get('city');
  const zipCode = task.variables.get('zip_code');
  const paymentMethodId = task.variables.get('payment_method_id');
  const deliveryMethodId = task.variables.get('delivery_method_id');
  const userId = task.variables.get('user_id');
  const voucherId = task.variables.get('voucher_id');

  const order = {
    first_name: firstName,
    last_name: lastName,
    email: email,
    phone_number: phoneNumber,
    address: address,
    city: city,
    zip_code: zipCode,
    finished: false,
    payment_method_id: paymentMethodId,
    delivery_method_id: deliveryMethodId,
    user_id: userId,
    voucherId: voucherId,
  }

  Order.create(order).then(async data => {
    await taskService.complete(task, data);
  }).catch(err => {
    taskService.handleFailure(task, {
      errorMessage: err.message || 'Some error occurred while creating the order.',
      errorDetails: 'Error code 500',
      retries: 1,
      retryTimeout: 1000
    });
  });
});
