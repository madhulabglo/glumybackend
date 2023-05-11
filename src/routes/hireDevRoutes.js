import {
  getAllUsers,
  createUser,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
  userLogin
} from "../controllers/userController";
import { createJob,getAllJobs,updateJob,deleteJob,getIndividualJobs,searchJob } from '../controllers/jobsController';
import multer from "multer";
import path from 'path';
import fs from 'fs';

// Set up directory for uploaded files
const uploadDir = "./uploads";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}


// Set up storage for uploaded resumes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

// Set up multer middleware
const upload = multer({ storage });

const routes = (app) => {
    app.route("/user").get(getAllUsers).post(upload.single("resumeFile"),createUser).put(updateUserProfile);
    app.route("/user/:id").get(getUserProfile).delete(deleteUserProfile);
    app.route("/user/login").post(userLogin),
    app.route('/jobs/new').post(createJob),
    app.route('/jobs').get(getAllJobs);
    app.route('/jobs/individual').get(getIndividualJobs);
    app.route('/jobs/:id').put(updateJob).delete(deleteJob);
    app.route("/search").get(searchJob);

  };

export default routes;
