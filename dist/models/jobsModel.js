"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Schema = _mongoose["default"].Schema;
var jobsSchema = new Schema({
  jobTitle: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  jobDescription: {
    type: String,
    required: true
  },
  salary: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  highestQualification: {
    type: "String",
    "enum": ["High School", "Diploma", "Bachelor", "Master", "PhD"],
    required: true
  },
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, {
  timestamps: true
});
var Jobs = _mongoose["default"].model('Jobs', jobsSchema);
module.exports = Jobs;