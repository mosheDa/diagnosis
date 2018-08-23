'use strict';
const axios = require('axios');
const async = require ('async');

var mongoose = require('mongoose'),
Diagnosis = mongoose.model('Diagnosis');

exports.list_all_diagnosis = function(req, res) {
  Diagnosis.find({}, function(err, diagnosis) {
    if (err)
      res.send(err);
    res.json(diagnosis);
  });
};

exports.list_all_users = function(req, res) {
  async.parallel({
    usersVideos:(callback)=>{
      getVideos(callback)
    },
    diagnosis: function(callback){
      Diagnosis.find({}).lean().exec(function (err, docs) {
        if(err) return callback(err);
        return callback(null, docs);
        // docs are plain javascript objects instead of model instances
    });
    }
}, function(err, results) {
    if(err) return res.send(err);
    const richDiagnosis = results.diagnosis.map(diagnosis=>{
      const userVideos = results.usersVideos.filter((video) => {
        return video.context.custom.username == diagnosis.userName;
      })
      console.log(diagnosis.userName, userVideos)

      const defaultImage = "https://www.ralphlauren.com/on/demandware.static/-/Sites-RalphLauren_US-Library/default/dw8159c7e0/images/baby/feature/babys-first-test/20160803_baby_feat_c01.jpeg";
      const userVideoImage =  userVideos.length ? userVideos[0].public_id : defaultImage;
      const videosCount = userVideos.length;

      return {...diagnosis, videosCount, userVideoImage}
    })

    return res.send(richDiagnosis);
});
  // Diagnosis.find({}, function(err, diagnosis) {
  //   if (err)
  //     res.send(err);    
  //   res.send(diagnosis.map(d=> d.userName));
  // });
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

exports.read_a_diagnosis_by_name = function(req, res) {
  Diagnosis.findOne({userName: req.params.username}, function(err, diagnosis) {
    if (err)
      res.send(err);
    res.json(diagnosis);
  });
};

exports.update_a_diagnosis = function(req, res) {
  delete req.body.userName;
  
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

const getVideos = (callback) => {
  const CLOUDBINARY_API_ENDPOINT = 'https://211811477677314:-Ef3mMlkcGE3tE40t-FOX4LVqbw@api.cloudinary.com/v1_1/dtvoiy5lg/resources/video/context/?max_results=500&key=username';  

  axios.get(CLOUDBINARY_API_ENDPOINT)
  .then(res => {
    return callback(null, res.data.resources);
  }).catch(err =>{
    return callback(err)
  });
}
