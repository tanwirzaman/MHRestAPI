var express = require('express');
var router = express.Router();

var user = require('../dao/users.js');
var physician = require('../dao/physicians.js');
var consultation = require('../dao/consultations.js');
var lab = require('../dao/labs.js');
var claim = require('../dao/claims.js');
var allergy = require('../dao/allergies.js');
var medication = require('../dao/medications.js');
var bmp = require('../dao/bmps.js');
var cbc = require('../dao/cbcs.js');
var dashboard = require('../dao/dashboard.js');
/*
 * Routes
 */
router.get('/users', user.getAll);
router.get('/user/:id', user.getOne);
router.get('/user/:id/allergies', user.getAllergiesForUser);
router.get('/user/:id/medications', user.getMedicationsForUser);
router.post('/user/', user.create);
router.put('/user/:id', user.update);
router.delete('/user/:id', user.delete);

router.get('/physicians', physician.getAll);
router.get('/physician/:id', physician.getOne);
router.post('/physician/', physician.create);
router.put('/physician/:id', physician.update);
router.delete('/physician/:id', physician.delete);

router.get('/consultations', consultation.getAll);
router.get('/consultations/patient/:patientId', consultation.getConsultationsForUser);
router.get('/consultations/patient/:patientId/details', consultation.getUserDetails);
router.get('/consultations/patient/:patientId/mostrecent', consultation.getMostRecentConsultationsForUser);
router.get('/consultation/:id', consultation.getOne);
router.post('/consultation/', consultation.create);
router.put('/consultation/:id', consultation.update);
router.delete('/consultation/:id', consultation.delete);

router.get('/labs', lab.getAll);
//router.get('/labs/patient/:patientId', lab.getLabsForUser);
router.get('/patient/:patientId/labs/mostrecent', lab.getMostRecentLabsForUser);
router.get('/lab/:id', lab.getOne);
router.post('/lab/', lab.create);
router.put('/lab/:id', lab.update);
router.delete('/lab/:id', lab.delete);

router.get('/claims', claim.getAll);
router.get('/claims/patient/:patientId/mostrecent', claim.getMostRecentClaimsForUser);
router.get('/claim/:id', claim.getOne);
router.post('/claim/', claim.create);
router.put('/claim/:id', claim.update);
router.delete('/claim/:id', claim.delete);

router.get('/allergies', allergy.getAll);
router.get('/allergy/:id', allergy.getOne);
router.post('/allergy/', allergy.create);
router.put('/allergy/:id', allergy.update);
router.delete('/allergy/:id', allergy.delete);

router.get('/medications', medication.getAll);
router.get('/medication/:id', medication.getOne);
router.post('/medication/', medication.create);
router.put('/medication/:id', medication.update);
router.delete('/medication/:id', medication.delete);

router.get('/bmp', bmp.getAll);
router.get('/bmp/:id', bmp.getOne);
router.post('/bmp/', bmp.create);
router.put('/bmp/:id', bmp.update);
router.delete('/bmp/:id', bmp.delete);

router.get('/cbc', cbc.getAll);
router.get('/cbc/:id', cbc.getOne);
router.post('/cbc/', cbc.create);
router.put('/cbc/:id', cbc.update);
router.delete('/cbc/:id', cbc.delete);

router.get('/patient/:patientId/dashboardData', dashboard.getMostRecentDetails);

module.exports = router;
