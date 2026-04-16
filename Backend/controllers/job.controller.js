import { Job } from "../models/job.model.js";

// admin create the job
export const createJob = async (req, res) => {
    try {
        const {title, description, salary, location, jobType, position, requirements, experience, companyId} = req.body;
        const userId = req.id;

        if(!title || !description || !salary || !location || !jobType || !position || !experience || !requirements || !companyId)   return res.status(404).json({message : "some field is missing", success : false});

        const job = await Job.create({title, description, requirements : requirements.split(','), salary, location, jobType, position, experience, createdBy : userId, company : companyId});

        return res.status(200).json({message : "new job created successfully", job, success : true});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message : "something wen't wrong while creating the new job", success : false});
    }
}

// for admin
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({createdBy : adminId});
        if(!jobs)    return res.status(404).json({message : "job not found", success : false});
        return res.status(200).json({jobs, success : true});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message : "something wen't wrong while getting jobs in admin side", success : false});
    }
}

// for students
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or : [
                {title : {$regex : keyword, $options : "i"}},
                {description : {$regex : keyword, $options : "i"}},
            ]
        };

        const job = await Job.find(query).populate({
            path : "company"
        }).sort({createdAt : -1});

        if(!job)    return res.status(404).json({message : "job not found", success : false});

        return res.status(200).json({job, success : true});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message : "something wen't wrong while getting all jobs", success : false});
    }
}

// for students
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId);
        // console.log(job);
        if(!job)    return res.status(404).json({message : "job not found", success : false});
        return res.status(200).json({job, success : true});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message : "something wen't wrong while getting job by id", success : false});
    }
}
