module.exports = app => {
    const controller = require('../controllers/customerWallets')();
  
    app.route('/api/v1/customer-wallets')
      .get(controller.listCustomerWallets)
      .post(controller.saveCustomerWallets);

    app.route('/api/v1/customer-wallets/:customerId')
      .put(controller.updateCustomerWallets)
      .get(controller.readCustomerWallet);

    app.route('/api/v1/customer-wallets/zipcode/:customerId')
      .get(controller.getZipCodeInfo);
}