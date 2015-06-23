var Consultation = require('../models/consultation');
var User = require('../models/user');

var consultations = {

  getAll: function(req, res) {
    Consultation.find(function (err,consultations) {
      if (err) {
        console.log(err);
      } else {
        res.send(consultations);
      }
    });
  },

  getOne: function(req, res) {
    var id = req.params.id;
    Consultation.findOne({ ConsultationId: id }, function (err,consultation) {
      if (err) {
        console.log(err);
      } else {
        if (consultation) {
          res.send(consultation);
        } else {
          res.status(404);
          res.json({
            "status": 404,
            "message": "Not Found"
          });
        }
      }
    });
  },

    getConsultationsForUser: function(req, res) {
    var patientId = req.params.patientId;
    Consultation.find({ PatientId: patientId },{ConsultationId:1,PatientId:1,PhysicianId:1,ConsultationDate:1,Locations:1,_id:0}, function (err,consultation) {
      if (err) {
        console.log(err);
      } else {
        if (consultation) {
          res.send(consultation);
        } else {
          res.status(404);
          res.json({
            "status": 404,
            "message": "Not Found"
          });
        }
      }
    });
  },
  
  getMostRecentConsultationsForUser: function(req, res) {
    var patientId = req.params.patientId;
	var limitRecords=3;
	
    Consultation.find({ PatientId: patientId },{ConsultationId:1,PatientId:1,PhysicianId:1,ConsultationDate:1,Locations:1,_id:0}, function (err,consultation) {
      if (err) {
        console.log(err);
      } else {
        if (consultation) {
          res.send(consultation);
        } else {
          res.status(404);
          res.json({
            "status": 404,
            "message": "Not Found"
          });
        }
      }
    }).sort({ConsultationDate:-1}).limit(limitRecords);
  },
  
  getUserDetails: function(req, res) {
    var patientId = req.params.patientId;	
	Consultation.findOne({ PatientId: patientId },{PatientId:1,_id:0},function(err,cons){
	User.find({"userId":{"$in":[cons["PatientId"]]}},{firstName:1,lastName:1,_id:0}, function (err,userDetails) {
      if (err) {
        console.log(err);
      } else {
        if (userDetails) {
          res.send(userDetails);
        } else {
          res.status(404);
          res.json({
            "status": 404,
            "message": "Not Found"
          });
        }
      }
    });	
	});	
  },
  
  
  create: function(req, res) {
    var body = req.body;
    Consultation.findOne({ ConsultationId: body.ConsultationId }, function (err,consultation) {
      if (err) {
        console.log(err);
      } else {
        if (consultation) {
          res.status(409);
          res.json({
            "status": 409,
            "message": "Consultation already exists."
          });
        } else {
          var newConsultation = new Consultation({
            ConsultationId: body.ConsultationId,
            PatientId: body.PatientId,
            PhysicianId: body.PhysicianId,
            ConsultationDate: body.ConsultationDate,
			Locations: body.Locations
          });
          newConsultation.save(function(err,newConsultation) {
            if (err) {
              return console.error(err);
            } else {
              res.json(newConsultation);
            }
          });
        }
      }
    });
  },

  update: function(req, res) {
    var body = req.body;
    var id = req.params.id;
    
    Consultation.findOne({ ConsultationId: id }, function (err,consultation) {
      if (err) {
        console.log(err);
      } else {
        if (consultation) {
          Consultation.findOneAndUpdate({ConsultationId:id},body, function (err,updatedConsultation) {
            if (err) {
              console.log(err);
            } else {
              res.json(updatedConsultation);
            }
          });
        } else {
          res.status(404);
          res.json({
            "status": 404,
            "message": "Not Found"
          });
        }
      }
    });
    
  },

  delete: function(req, res) {
    var id = req.params.id;
    Consultation.findOne({ ConsultationId: id }, function (err,consultation) {
      if (err) {
        console.log(err);
      } else {
        if (consultation) {
          Consultation.remove({ConsultationId: id}, function (err,consultation) {
            if (err) {
              console.log(err);
            } else {
              // normally we would return a 'true' or 'false' to our client, but let's output a status
              // for illustration purposes
              res.status(200);
              res.json({
                "status": 200,
                "message": "delete of " + id + " succeeded."
              });
            }
          });
        } else {
          res.status(404);
          res.json({
            "status": 404,
            "message": "Not Found"
          });
        }
      }
    });
  }
};

module.exports = consultations;
