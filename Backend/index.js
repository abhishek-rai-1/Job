import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import dbConnect from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicantRoute from './routes/applicants.route.js'

dotenv.config({});

const app = express();
const PORT = process.env.PORT || 8000;
const corsOption = {origin : "http://localhost:5173",credentials : true};

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());
app.use(cors(corsOption));

// api's
app.use('/api/v1/user', userRoute);
app.use('/api/v1/company', companyRoute);
app.use('/api/v1/job', jobRoute);
app.use('/api/v1/applicant', applicantRoute);

app.listen(PORT, async (req, res) => {
    await dbConnect();
    console.log(`server is listening on port : ${PORT}`);
})