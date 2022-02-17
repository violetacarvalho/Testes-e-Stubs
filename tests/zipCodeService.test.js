const { expect } = require('chai');
const sinon = require('sinon');
const ZipCodeService = require('../src/services/zipCode');
const mockCustomerWallet = require('./data/mockCustomerWallet.json');
const mockZipCodeInfo = require('./data/mockZipCode.json');

let sandbox;
const zipCode = new ZipCodeService();

describe('Test suit - Zip Code Service.', async () => {

    before('Before all tests', async () => sandbox = sinon.createSandbox());

    afterEach('After each test', async () => sandbox.restore());

    it('SUCCESS: Get Zip Code', async () => {
        sandbox.stub(zipCode, 'getCustomerWallet').resolves(mockCustomerWallet);
        sandbox.stub(zipCode, 'apiGet').resolves(mockZipCodeInfo);
        const response = await zipCode.getZipCodeInfo(mockCustomerWallet.id);
        const expectedResponse = {
            customer: mockCustomerWallet,
            zipCodeInfo: mockZipCodeInfo,
        };
        expect(response).to.be.eqls(expectedResponse);
    });

    it('FAIL: Get Zip Code', async () => {
        sandbox.stub(zipCode, 'getCustomerWallet').resolves();
        const response = await zipCode.getZipCodeInfo(mockCustomerWallet.id);
        const expectedResponse = {
            customer: mockCustomerWallet,
            zipCodeInfo: mockZipCodeInfo,
        };
        expect(response).not.to.be.eqls(expectedResponse);
    });
});