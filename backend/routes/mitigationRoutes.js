const express = require('express');
const { getAllMitigations, createMitigations, deleteMitigation } = require('../controller/mitigationController');

const router = express.Router();

router.get('/api/mitigations', getAllMitigations);
router.post('/api/mitigations', createMitigations);
router.delete('/api/mitigations/:id', deleteMitigation);

module.exports = router;