"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserSchema = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Schema = _mongoose["default"].Schema;
var UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    min: 4,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  resumeFile: {
    type: String
  },
  firstName: {
    type: String,
    required: [true, "First name is required"]
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"]
  },
  email: {
    type: String,
    required: [true, "Email address is required"],
    unique: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/, "Please enter a valid email address"]
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    unique: true,
    match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"]
  },
  highestQualification: {
    type: String,
    "enum": ["High School", "Associate Degree", "Bachelor's Degree", "Master's Degree", "Doctorate", "None"],
    "default": "None"
  },
  courseStudied: {
    type: String,
    "enum": ["FSD", "DSA", "ML-AI", "RPA", "ST", "CSA", "None"],
    "default": "None"
  },
  batchDetails: {
    type: String,
    "enum": ["KKEM", "NORKA", "KDISC", "None"],
    "default": "None"
  },
  placementStatus: {
    type: String,
    "enum": ["Placed", "Job-Seeking", "None"],
    "default": "None"
  },
  companyName: {
    type: String,
    "default": "None"
  },
  userType: {
    type: String,
    "enum": ["Alumni", "Employer", "Admin"],
    "default": "Admin",
    required: [true, "User type is required"]
  },
  created_date: {
    type: Date,
    "default": Date.now
  }
});
exports.UserSchema = UserSchema;
var User = _mongoose["default"].model("User", UserSchema);
module.exports = User;