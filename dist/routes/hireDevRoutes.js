"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _userController = require("../controllers/userController");
var _jobsController = require("../controllers/jobsController");
var _multer = _interopRequireDefault(require("multer"));
var _path = _interopRequireDefault(require("path"));
var _fs = _interopRequireDefault(require("fs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// Set up directory for uploaded files
var uploadDir = "./uploads";
if (!_fs["default"].existsSync(uploadDir)) {
  _fs["default"].mkdirSync(uploadDir);
}

// Set up storage for uploaded resumes
var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, "uploads");
  },
  filename: function filename(req, file, cb) {
    var uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    var ext = _path["default"].extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  }
});

// Set up multer middleware
var upload = (0, _multer["default"])({
  storage: storage
});
var routes = function routes(app) {
  app.route("/user").get(_userController.getAllUsers).post(upload.single("resumeFile"), _userController.createUser).put(_userController.updateUserProfile);
  app.route("/user/:id").get(_userController.getUserProfile)["delete"](_userController.deleteUserProfile);
  app.route("/user/login").post(_userController.userLogin), app.route('/jobs/new').post(_jobsController.createJob), app.route('/jobs').get(_jobsController.getAllJobs);
  app.route('/jobs/individual').get(_jobsController.getIndividualJobs);
  app.route('/jobs/:id').put(_jobsController.updateJob)["delete"](_jobsController.deleteJob);
  app.route("/search").get(_jobsController.searchJob);
};
var _default = routes;
exports["default"] = _default;