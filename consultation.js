var mongoose = require('mongoose');

var ConsultationSchema = mongoose.Schema({
  ConsultationId: String,
  PatientId: String,
  PhysicianId: String,
  ConsultationDate : Date,
  Locations : [String]
});

module.exports = mongoose.model('Consultation', ConsultationSchema);
