const { expect } = require('chai');
const sinon = require('sinon');
const uuid = require('uuid');
const customerWalletsDB = require('../src/data/customerWallets.json');
const CustomerWalletsService = require('../src/services/customerWallets');
const mockCustomerWallet = require('./data/mockCustomerWallet.json');

let sandbox;
const customerWallets = new CustomerWalletsService();

describe('Test suit - Customer Wallets Service.', async () => {

    before('Before all tests', async () => sandbox = sinon.createSandbox());

    afterEach('After each test', async () => sandbox.restore());

    it('SUCCESS: List All Wallets', () => {
        const response = customerWallets.listCustomerWallets();
        expect(response).to.be.eql(customerWalletsDB.customerWallets);
    });

    it('FAIL: List All Wallets', () => {
        // Stringifying and parsing in order to unlink response from customerWallets data
        const response = JSON.parse(JSON.stringify(customerWallets.listCustomerWallets()));
        response.data.push('Error creator');
        expect(response.data).not.to.be.equals(customerWalletsDB.customerWallets.data);
    });

    it('SUCCESS: Create New Wallet', async () => {
        sandbox.stub(uuid, 'v4').resolves('a5becdb8-fcf1-4108-bc93-447cbbfae9f5');
        const response = await customerWallets.saveCustomerWallets(mockCustomerWallet);

        expect(await response.data[response.data.length - 1].id).to.be.eql(
            mockCustomerWallet.id
        );
        expect(await response.data[response.data.length - 1].parentId).to.be.eql(
            mockCustomerWallet.parentId
        );
        expect(response.data[response.data.length - 1].name).to.be.eql(
            mockCustomerWallet.name
        );
        expect(response.data[response.data.length - 1].birthDate).to.be.eql(
            mockCustomerWallet.birthDate
        );
        expect(response.data[response.data.length - 1].zipCode).to.be.eql(
            mockCustomerWallet.zipCode
        );
        expect(response.data[response.data.length - 1].occupation).to.be.eql(
            mockCustomerWallet.occupation
        );
    });

    it('FAIL: Create New Wallet', async () => {
        const response = await customerWallets.saveCustomerWallets(mockCustomerWallet);
        expect(response.data).not.to.contains(mockCustomerWallet);
    });

    it('SUCCESS: Update Wallet', async () => {
        sandbox.stub(customerWallets, 'getCustomerWalletByCustomerId').resolves(
            mockCustomerWallet
        );
        mockCustomerWallet.phone = 'none';
        const response = await customerWallets.updateCustomerWallets(
            mockCustomerWallet,
            mockCustomerWallet.id,
        );
        expect(response).to.be.eqls(mockCustomerWallet);
    });

    it('FAIL: Update Wallet', async () => {
        sandbox.stub(customerWallets, 'getCustomerWalletByCustomerId').resolves();
        mockCustomerWallet.phone = 'none';
        const response = await customerWallets.updateCustomerWallets(
            mockCustomerWallet,
            mockCustomerWallet.id,
        );
        expect(response).not.to.be.eqls(mockCustomerWallet);
    });
});