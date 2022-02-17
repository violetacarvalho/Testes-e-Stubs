module.exports = app => {
    const controller = require('../controllers/zipCode')();

    app.route('/api/v1/zipcode/:customerId')
      .get(controller.getZipCodeInfo);
}