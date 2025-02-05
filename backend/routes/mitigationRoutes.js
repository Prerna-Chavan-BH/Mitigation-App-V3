const express = require('express');
// const mitigationController = require('../controller/mitigationController')
const { getMitigations, createMitigations, deleteMitigation, updateMitigation } = require('../controller/mitigationController');

const router = express.Router();

router.post('/mitigations', createMitigations);
router.get('/mitigations', getMitigations);
router.delete('/mitigations/:mitigationId', deleteMitigation);
router.put('/mitigations/:mitigationId', updateMitigation);

module.exports = router;