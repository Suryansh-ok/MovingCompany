const Job = require('../models/job.model');
const Service = require('../models/service.model');

exports.createJob = async ( req, res ) => {
    const { serviceId, origin, destination, movingDate, distanceMiles, estimatedTime } = req.body;

    if (!serviceId || !origin || !destination || !movingDate || !distanceMiles || !estimatedTime ){
        return res.status(400).json({ error: "All fields are required"});
    }

    try {
        const service = await Service.findById(serviceId);
        if( !service ) return res.status(404).json( { error: 'Service not found'} );

        const estimatedCost = (service.laborCostPerMinute * estimatedTime) + ( service.costPerMile * distanceMiles );
        
        const job = await Job.create({
            user: req.user.userId,
            service: serviceId,
            origin,
            destination,
            movingDate,
            distanceMiles,
            estimatedTime,
            estimatedCost
        });
        res.status(201).json( { message: 'New job created'});
    } catch ( error ) {
        res.status(500).json( { error: 'Failed to create job', details: error.message});
    }
};