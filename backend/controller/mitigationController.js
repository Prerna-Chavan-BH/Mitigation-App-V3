const Mitigation = require('../models/mitigationModel');

//Fetch all mitigations
exports.getAllMitigations = async(req, res) => {
    try{
        const mitigations = await Mitigation.findAll();
        res.json(mitigations);
    }catch(error){
        res.status(500).json({ message: "Error getting the mitigations" ,error});
    }
};

//Create mitigations
exports.createMitigations = async(req, res) => {
    const { description, pre_mitigation_score, post_mitigation_score } = req.body;

    if(!description || pre_mitigation_score == null || post_mitigation_score == null){
        return res.status(400).json({message: 'All fields are required'});
    }

    try{
        const mitigation = await Mitigation.create({
            description,
            pre_mitigation_score,
            post_mitigation_score,
        });
        res.status(201).json(mitigation);
    }catch(error){
        res.status(500).json({message: "Error creating the mitigations",error});
    }
};

//Delete mitigation
exports.deleteMitigation = async(req, res) => {
    const {id} = req.param;
    try{
        await Mitigation.destroy({where: {id}});
        res.json({message: 'Mitigation destroyed successfully'});
    }catch(error){
        res.status(500).json({ message: error.message});
    }
};
