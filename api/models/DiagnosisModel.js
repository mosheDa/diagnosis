'use strict';


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DiagnosisSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique : true
  },
  nameOfChild: {
    type: String
  },
  expertChecked: {
    type: String,
    required: function() {
      return !this.result;
    }
  },
  expertRedirected: {
    type: String
  },
  result: {
    text: String,
    date: Date
  }
});


module.exports = mongoose.model('Diagnosis', DiagnosisSchema);