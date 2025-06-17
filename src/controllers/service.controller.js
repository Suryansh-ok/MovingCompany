const Service = require('../models/service.model');

exports.getAllServices = async (req, res) => {
    try{
        const services = await Service.find();
        res.json(services);
    } catch (err) {
        res.status(500).json({ error: 'Failed to get services'});
    }
};

exports.createService = async (req, res) => {
    const { title, description, baseCost, numberOfMovers, laborCostPerMinute, costPerMile } = req.body;

    try{
        const service = await Service.create({
            title, 
            description,
            baseCost,
            numberOfMovers,
            laborCostPerMinute,
            costPerMile
        })
        res.status(201).json(service);
    } catch ( error ) {
        res.status(500).json({ error: "Failed to create service"});
    }
};

exports.deleteService = async (req, res) => {
    const {id} = req.params;

    try{
        const deletedService = await Service.findByIdAndDelete(id);
        if(!deletedService) return res.status(404).json({ error: 'Service not found' });

        res.status(200).json({'message': 'Service deleted'});
    } catch ( error ) {
        res.status(500).json({ error: "Failed to delete service"});
    }
};