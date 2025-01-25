const express = require('express');
const mitigationController = require('../controller/mitigationController')
const { getAllMitigations, createMitigations, deleteMitigation } = require('../controller/mitigationController');

const router = express.Router();

router.get('/api/mitigations', async(req, res) => {
    try{
        const mitigations = await mitigationController.getAllMitigations();
        res.json(mitigations);
    }catch(error){
        res.status(500).json({message: "Error fetching the mitigations",error});
    }
});

router.post('/api/mitigations', async (req, res) => {
    try{
        const mitigations = await mitigationController.createMitigations(req.body);
        res.json(mitigations);
    }catch(error){
        res.status(500).json({message: "Error creating the mitigations",error});
    }
});

router.delete('/api/mitigations/:id', async(req, res) => {
    try{
        const id = req.params.id;
        await mitigationController.deleteMitigation(id);
        res.json({message: 'Mitigation deleted successfully'});
    }catch(error){
        res.status(500).json({message: "Error fetching the mitigations",error});
    }
});

module.exports = router;