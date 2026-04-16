import { Company } from "../models/company.model.js";

export const registerCompany = async (req, res) => {
    try {
        const {companyName} = req.body;
  
        if(!companyName)    return res.status(400).json({message : "some field is missing", success : false});

        let company = await Company.findOne({companyName});
        if(company)     return res.status(400).json({message : "please enter unique comapany name", success : false});
        
        company = await Company.create({companyName, description, userId : req.id});

        return res.status(200).json({message : "company registered successfully", company, success : true});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message : "some error occured while creating company", success : false});
    }
}

export const getCompany = async (req, res) => {
    try {
        const userId = req.id;  // logged in user id
        const companies = await Company.find({userId});
        if(!companies)  return res.status(404).json({message : "companies not found", success : false});
        return res.status(200).json({companies, success : true});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message : "some error occured while getting all company details", success : false});
    }
}

export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if(!company)  return res.status(404).json({message : "company not found", success : false});
        return res.status(200).json({company, success : true});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message : `some error occured while getting the company id`, success : false});
    }
}

export const updateCompany = async (req, res) => {
    try {
        const {companyName, description, website, location} = req.body;
        const logo = req.file;

        // cloudinary logic

        const company = await Company.findByIdAndUpdate(req.params.id, {companyName, description, website, location}, {new : true});

        if(!company)    return res.status(404).json({message : "company not found", success : false});

        await company.save();

        return res.status(200).json({message : "company updated successfully", company, success : true});
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({message : "some error occured while updating the company details", success : false});
    }
}