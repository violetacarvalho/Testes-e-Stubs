const uuid = require('uuid');
const customerWalletsDB = require('../data/customerWallets.json');
const axios = require('axios');

module.exports = class CustomerWalletService {
  
    listCustomerWallets = () => customerWalletsDB;

    saveCustomerWallets = (body) => {
        customerWalletsDB.customerWallets.data.push({
            id: uuid.v4(),
            parentId: uuid.v4(),
            name: body.name,
            birthDate: body.birthDate,
            cellphone: body.cellphone,
            phone: body.phone,
            email: body.email,
            occupation: body.occupation,
            state: body.state,
        });

        return customerWalletsDB;
    }

    readCustomerWallet = (customerId) => {
        const newCustomerWallet = this.getCustomerWalletByCustomerId(customerId);
        return newCustomerWallet;
    }

    updateCustomerWallets = (customerId, body) => {
        const newCustomerWallet = this.getCustomerWalletByCustomerId(customerId);

        if (!newCustomerWallet) return;

        const newCustomerKeys = Object.keys(body);
        const newCustomerValues = Object.values(body);

        for (let i; i < newCustomerKeys.length; i++) {
            newCustomerWallet[newCustomerKeys[i]] = newCustomerValues[i];
        }

        return newCustomerWallet;
    }

    getCustomerWalletByCustomerId = (customerId) => {
        const filteredCustomerWalletDB = customerWalletsDB.customerWallets.data.filter((cw) => cw.id === customerId);
        return filteredCustomerWalletDB.length > 0 ? filteredCustomerWalletDB[0] : null;
    }

    getZipCodeInfo = (customerId) => {
        const response = { customer: {}, zipCodeInfo: {} };
        const customerWallet = this.getCustomerWalletByCustomerId(customerId);

        if (!customerWallet) return response;

        response.customer = customerWallet;

        const res = axios.get(`https://viacep.com.br/ws/${customerWallet.zipCode}/json`);
        const finalResponse = res.then(resp => {
            response.zipCodeInfo = resp.data;
            return response;
        });

        return finalResponse;
    }
}