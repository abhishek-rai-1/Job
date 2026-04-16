import { Applicants } from "../models/applicants.model.js";
import { Job } from "../models/job.model.js";

export const appliedJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;

        if(!jobId)  return res.status(400).json({message : "job id is required", success : false});

        // check if job already exist or not
        const job = await Job.findById(jobId);
        if(!job)    return res.status(400).json({message : "job is not present", success : false});

        // check if user already applied for the job or not
        const existingApplicant = await Applicants.findOne({job : jobId, applicant : userId});
        if(existingApplicant) return res.status(400).json({message : "you have already applied for the job", success : false});

        await Applicants.create({job : jobId, applicant : userId});
        job.applicants.push(userId);
        await job.save();

        return res.status(201).json({message : "job applied successfully", success : true});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message : "something wen't wrong while applying job", success : false});
    }
}

export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const appliedJobs = await Applicants.find({applicant : userId}).sort({createdAt : -1}).populate({
            path : 'job', 
            options : {sort : {createdAt : -1}},
            populate : {
                path : 'company',
                options : {sort : {createdAt : -1}}
            }
        });

        if(!appliedJobs)    return res.status(400).json({message : "no applicants", success : false});

        return res.status(200).json({appliedJobs, success : true});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message : "something wen't wrong while getting all jobs", success : false});
    }
}

export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path : 'applicants',
            options : {sort : {createdAt : -1}},
            populate : {
                path : 'applicant',
                options : {sort : {createdAt : -1}}
            }
        })

        if(!job)    return res.status(404).json({message : "no applicants", success : false});

        return res.status(200).json({job, success : true});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message : "something wen't wrong while getting applicants", success : false});
    }
}

export const updateStatus = async (req, res) => {
    try {
        const {status} = req.body;
        const applicantId = req.params.id;

        if(!status) return res.status(400).json({message : "status is required", success : false});

        const applicants = await Applicants.findOne({_id : applicantId});
        if(!applicants)    return res.status(400).json({message : "applicants not found", success : false});

        applicants.status = status.toLowerCase();
        await applicants.save();

        return res.status(200).json({message : "status updated", success : true});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message : "something wen't wrong while updating status", success : false});
    }
}