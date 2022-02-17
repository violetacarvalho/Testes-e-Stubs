const axios = require('axios');
const CustomerWalletsService = require('../services/customerWallets');

module.exports = class ZipCodeService {
    getZipCodeInfo = async (customerId) => {
        const response = { customer: {}, zipCodeInfo: {} };

        const customerWallet = await this.getCustomerWallet(customerId);

        if (!customerWallet) return response;

        response.customer = customerWallet;
        response.zipCodeInfo = await this.apiGet(`https://viacep.com.br/ws/${customerWallet.zipCode}/json`);

        return response;
    }

    apiGet = (url) => {
        const res = axios.get(url);
        const apiResponse = res.then(resp => resp.data);
        return apiResponse;
    };

    getCustomerWallet = (customerId) => {
        const customerWalletsService = new CustomerWalletsService();
        const customerWallet = customerWalletsService.getCustomerWalletByCustomerId(customerId);
        return customerWallet;
    }
}