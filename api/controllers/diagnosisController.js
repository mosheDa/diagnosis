'use strict';

var mongoose = require('mongoose'),
Diagnosis = mongoose.model('Diagnosis');

exports.list_all_diagnosis = function(req, res) {
  Diagnosis.find({}, function(err, diagnosis) {
    if (err)
      res.send(err);
    res.json(diagnosis);
  });
};


exports.create_a_diagnosis = function(req, res) {
  var new_diagnosis = new Diagnosis(req.body);
  new_diagnosis.save(function(err, diagnosis) {
    if (err)
      res.send(err);
    res.json(diagnosis);
  });
};

exports.read_a_diagnosis = function(req, res) {
  Diagnosis.findById(req.params.diagnosisId, function(err, diagnosis) {
    if (err)
      res.send(err);
    res.json(diagnosis);
  });
};

exports.update_a_diagnosis = function(req, res) {
  Diagnosis.findOneAndUpdate({_id:req.params.diagnosisId}, req.body, {new: true}, function(err, diagnosis) {
    if (err)
      res.send(err);
    res.json(diagnosis);
  });
};
// Task.remove({}).exec(function(){});
exports.delete_a_diagnosis = function(req, res) {

  Diagnosis.remove({
    _id: req.params.diagnosisId
  }, function(err, diagnosis) {
    if (err)
      res.send(err);
    res.json({ message: 'Diagnosis successfully deleted' });
  });
};
