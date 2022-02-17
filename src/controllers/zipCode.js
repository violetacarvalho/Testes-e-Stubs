const ZipCodeService = require('../services/zipCode');

module.exports = () => {
    const zipCodeService = new ZipCodeService();
    const controller = {};

    controller.getZipCodeInfo = async (req, res) => {
        const { customerId } = req.params;
        const zipCode = await zipCodeService.getZipCodeInfo(customerId);
        
        if (!zipCode) {
            res.status(404).json({
                message: 'Cliente não encontrado na base.',
            });
        }
        
        res.status(200).json(zipCode);
    }

    return controller;
}