const express = require('express');
const {
  getHospitals,
  getHospital,
  createHospital,
  deleteHospital,
  updateHospital,
  getVacCenters,
} = require('../controllers/hospitals');
const { protect, authorize } = require('../middleware/auth');
const Appointment = require('../models/Appointment');
const appointmentRouter = require('./appointments');

const router = express.Router();

router.route('/vacCenters').get(getVacCenters);

router
  .route('/')
  .get(getHospitals)
  .post(protect, authorize('admin'), createHospital);
router
  .route('/:id')
  .get(getHospital)
  .put(protect, authorize('admin'), updateHospital)
  .delete(protect, authorize('admin'), deleteHospital);

router.use('/:hospitalId/appointments/', appointmentRouter);

module.exports = router;
