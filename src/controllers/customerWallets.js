const CustomerWalletsService = require('../services/customerWallets');

module.exports = () => {
    const customerWalletsService = new CustomerWalletsService();
    const controller = {};
  
    controller.listCustomerWallets = (req, res) => {
        const customerWallets = customerWalletsService.listCustomerWallets();
        res.status(200).json(customerWallets);
    }

    controller.saveCustomerWallets = async (req, res) => {
        const newCustomerWallet = await customerWalletsService.saveCustomerWallets(req.body);
        res.status(201).json(newCustomerWallet);
    }

    controller.readCustomerWallet = (req, res) => {
        const { customerId } = req.params;
        const customerWallet = customerWalletsService.readCustomerWallet(customerId);
        
        if (!customerWallet) {
            res.status(404).json({
                message: 'Cliente não encontrado na base.',
                customerWallets: customerWalletsDB,
            });
        }
        
        res.status(200).json(customerWallet);
    }

    controller.updateCustomerWallets = (req, res) => {
        const { customerId } = req.params;
        const customerWallet = customerWalletsService.updateCustomerWallets(customerId, req.body);

        if (!customerWallet) {
            res.status(404).json({
                message: 'Cliente não encontrado na base.',
                success: false,
                customerWallets: customerWalletsDB,
            });
        }

        res.status(200).json({
            message: 'Cliente encontrado e atualizado com sucesso!',
            success: true,
            customerWallet: customerWallet,
        });
    }

    return controller;
}