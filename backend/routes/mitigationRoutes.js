const express = require('express');
// const mitigationController = require('../controller/mitigationController')
const { getMitigations, createMitigations, deleteMitigation } = require('../controller/mitigationController');

const router = express.Router();

router.post('/mitigations', createMitigations);
router.get('/mitigations', getMitigations);
// router.get('/mitigations', async(req, res) => {
//     try{
//         const mitigations = await getMitigations();
//         res.json(mitigations);
//     }catch(error){
//         res.status(500).json({message: "Error fetching the mitigations",error: error.message});
//     }
// });

// router.post('/mitigations', async (req, res) => {
//     console.log("Request body: ", req.body);
//     try{
//         const mitigations = await createMitigations(req.body);
//         res.json(mitigations);
//     }catch(error){
//         res.status(500).json({message: "Error creating the mitigations via post",error: error.message});
//     }
// });

router.delete('/mitigations', deleteMitigation);
// router.delete('/mitigations/:id', async(req, res) => {
//     try{
//         const id = req.params.id;
//         await deleteMitigation(id);
//         res.json({message: 'Mitigation deleted successfully'});
//     }catch(error){
//         res.status(500).json({message: "Error fetching the mitigations",error: error.message});
//     }
// });

module.exports = router;