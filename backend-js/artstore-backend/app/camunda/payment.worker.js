const { Variables, Client, logger } = require('camunda-external-task-client-js')
const db = require('../models/index.js');
const PaymentMethod = db.payment_methods;

const config = { baseUrl: 'http://localhost:8080/engine-rest', use: logger, asyncResponseTimeout: 10000 };
const client = new Client(config);

client.subscribe('create-payment', async function({ task, taskService }) {
  console.log('here');

  const name = task.variables.get('name');

  const paymentMethod = {
    name: name,
  }

  PaymentMethod.create(paymentMethod).then(async data => {
    const variables = new Variables();
    variables.set('name', name);

    await taskService.complete(task, data);
  }).catch(err => {
    taskService.handleFailure(task, {
      errorMessage: err.message || 'Some error occurred while creating the payment method.',
      errorDetails: 'Error code 500',
      retries: 1,
      retryTimeout: 1000
    });
  });

  await taskService.complete(task);
});
