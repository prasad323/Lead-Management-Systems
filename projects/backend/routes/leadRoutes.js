const express = require('express');
const router = express.Router();
const leadController = require('../controller/leadController');

router.post('/addleads', leadController.createLead);
router.get('/getleads', leadController.getLeads);
router.get('/dashboard', leadController.getDashboard);
router.get('/:id', leadController.getLeadById);
router.put('/:id', leadController.updateLead);
module.exports = router;