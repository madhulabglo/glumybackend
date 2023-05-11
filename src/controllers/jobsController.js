import jwt from "jsonwebtoken";
import Jobs from "../models/jobsModel";

const secretKey = "hdjdfgkk485739dnf";

let jobs;

export const createJob = async (req, res) => {
  try {
    const {
      jobTitle,
      companyName,
      jobDescription,
      salary,
      location,
      highestQualification,
    } = req.body;
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, secretKey);
    const postedBy = decodedToken.id;
    const job = new Jobs({
      jobTitle,
      companyName,
      jobDescription,
      salary,
      location,
      highestQualification,
      postedBy,
    });
    await job.save();
    res.status(200).json({ status: "success" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

export const getAllJobs = async (req, res) => {
  try {
    jobs = await Jobs.find();
    res.status(200).json({ jobs });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

export const updateJob = async (req, res) => {
  try {
    const {
      jobTitle,
      companyName,
      jobDescription,
      salary,
      location,
      highestQualification,
    } = req.body;
    const { id } = req.params;

    const job = await Jobs.findById(id);

    const updatedJobData = {
      jobTitle: jobTitle ? jobTitle : job.jobTitle,
      companyName: companyName ? companyName : job.companyName,
      jobDescription: jobDescription ? jobDescription : job.jobDescription,
      salary: salary ? salary : job.salary,
      location: location ? location : job.location,
      highestQualification: highestQualification
        ? highestQualification
        : job.highestQualification,
    };

    const updatedJob = await Jobs.findByIdAndUpdate(
      id,
      { $set: updatedJobData },
      { new: true }
    );

    res.status(200).json({ job: updatedJob });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    await Jobs.findByIdAndDelete(id);
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

export const getIndividualJobs = async (req, res) => {
  const userId = req.query.postedBy;

  try {
    const jobs = await Jobs.find({ postedBy: userId });
    res.status(200).json({ results: jobs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const searchJob = async (req, res) => {
  const job = req.query.jobtitle;
  const companyname = req.query.companyname;

  try {
    const data = await Jobs.find({});
    if (job !== "null" && companyname == "null") {
      const search = await data.filter((el) =>
        el.jobTitle
          .toLowerCase()
          .split(" ")
          .join("")
          .startsWith(job.toLowerCase().split(" ").join(""))
      );
      res.status(200).json({ results: search });
    } else if (companyname !== "null" && job == "null") {
      const search = await data.filter((el) =>
        el.companyName
          .toLowerCase()
          .split(" ")
          .join("")
          .startsWith(companyname.toLowerCase().split(" ").join(""))
      );
      res.status(200).json({ results: search });
    } else if (companyname && job) {
      const search = await data.filter(
        (el) =>
          el.jobTitle
            .toLowerCase()
            .split(" ")
            .join("")
            .startsWith(job.toLowerCase().split(" ").join("")) &&
          el.companyName
            .toLowerCase()
            .split(" ")
            .join("")
            .startsWith(companyname.toLowerCase().split(" ").join(""))
      );
      res.status(200).json({ results: search });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
