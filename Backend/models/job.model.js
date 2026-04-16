import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
    title : {
        type : String, 
        required : true
    },
    description : {
        type : String, 
        required : true
    },
    requirements : [{type : String}],
    salary : {
        type : Number, 
        required : true
    },
    location : {
        type : String,
        required : true
    },
    jobType : {
        type : String,
        required : true
    },
    experience : {
        type : Number,
        required : true
    },
    position : {
        type : Number,
        required : true
    },
    company : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'company',
        required : true
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true
    },
    applicants : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'applicants'
        }
    ]
}, {timestamps : true});

export const Job = mongoose.model('job', JobSchema);