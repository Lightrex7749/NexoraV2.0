import Job from '../models/Job.js';
import Application from '../models/Application.js';
import User from '../models/User.js';

export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ isActive: true }).populate('postedBy', 'name').lean();
    
    // Get applicant counts for each job
    const allApplications = await Application.find({}).lean();
    
    const formatted = jobs.map(j => {
      const applicantsCount = allApplications.filter(a => a.job.toString() === j._id.toString()).length;
      return {
        id: j._id.toString(),
        title: j.title,
        company: j.company,
        description: j.description,
        location: j.location || 'Remote',
        type: j.type,
        postedBy: j.postedBy?.name || 'Unknown',
        applicants: applicantsCount,
        createdAt: j.createdAt
      };
    });

    res.json({ success: true, data: formatted });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ success: false, detail: "Failed to fetch jobs" });
  }
};

export const createJob = async (req, res) => {
  try {
    const { title, company, description, location, type } = req.body;
    
    let user = await User.findOne({});
    if (!user) {
      return res.status(401).json({ success: false, detail: "Not authenticated" });
    }

    const job = await Job.create({
      title,
      company,
      description,
      location,
      type: type || 'full-time',
      postedBy: user._id
    });

    res.status(201).json({ success: true, data: job });
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ success: false, detail: "Failed to create job" });
  }
};

export const applyToJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { coverLetter } = req.body;
    
    let user = await User.findOne({});
    if (!user) {
      return res.status(401).json({ success: false, detail: "Not authenticated" });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, detail: "Job not found" });
    }

    const existingApplication = await Application.findOne({ job: jobId, applicant: user._id });
    if (existingApplication) {
      return res.status(400).json({ success: false, detail: "Already applied to this job" });
    }

    const application = await Application.create({
      job: jobId,
      applicant: user._id,
      coverLetter
    });

    res.status(201).json({ success: true, data: application });
  } catch (error) {
    console.error("Error applying to job:", error);
    res.status(500).json({ success: false, detail: "Failed to apply to job" });
  }
};
