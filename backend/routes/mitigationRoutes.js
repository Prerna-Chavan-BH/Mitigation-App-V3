const express = require('express');
// const mitigationController = require('../controller/mitigationController')
const { getMitigations, createMitigations, deleteMitigation } = require('../controller/mitigationController');

const router = express.Router();

router.post('/mitigations', createMitigations);
router.get('/mitigations', getMitigations);
router.delete('/mitigations/:mitigationId', deleteMitigation);

module.exports = router;