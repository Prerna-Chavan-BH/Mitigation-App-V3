const express = require('express');
const { getAllMitigations, createMitigations, deleteMitigation } = require('../controller/mitigationController');

const router = express.Router();

router.get('/getmitigation', getAllMitigations);
router.post('/createmitigation', createMitigations);
router.delete('/deletemitigation', deleteMitigation);

module.exports = router;