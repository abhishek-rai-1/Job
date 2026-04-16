import { useParams } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleJob } from "../redux/slicers/jobSlice";
import { JOB_API_END_POINT, JOBAPPLICANT_API_END_POINT } from "../utils/apiEndPoint";
import { toast } from "sonner";

export const JobDetail = () => {
    const { id: jobId } = useParams();
    const dispatch = useDispatch();
    const { singleJob } = useSelector((store) => store.job);
    const { user } = useSelector((store) => store.auth);
    const isInitiallyApplied = singleJob?.applicants?.some((applicant) => applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);

    const ApplyJobHandler = async () => {
        try {
            const res = await axios.get(`${JOBAPPLICANT_API_END_POINT}/applyJob/${jobId}`, {withCredentials: true});
            toast.success(res.data.message);
            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = {...singleJob,applicants: [...singleJob.applicants, user?._id] };
                dispatch(getSingleJob(updatedSingleJob));
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {withCredentials: true});
                if (res.data.success) {
                    dispatch(getSingleJob(res.data.job));
                    setIsApplied(res.data.job.applicants.some((applicant) => applicant === user?._id));
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <div className="max-w-5xl mx-auto my-10 px-4">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-3">
                    <h1 className="font-bold text-xl">{singleJob?.title}</h1>
                    <div className="flex items-center flex-wrap gap-3">
                        <Badge variant="outline" className="text-blue-700">
                            {singleJob?.position} Position
                        </Badge>
                        <Badge variant="outline" className="text-purple-700">
                            {singleJob?.jobType}
                        </Badge>
                        <Badge variant="outline" className="text-red-500">
                            {singleJob?.salary} LPA
                        </Badge>
                    </div>
                </div>

                <Button onClick={isApplied ? null : ApplyJobHandler} disabled={isApplied} className={`rounded-lg text-xl ${isApplied ? "bg-gray-500 cursor-not-allowed" : "bg-[#7209b7] hover:bg-[#610f97] cursor-pointer"}`}>
                    {isApplied ? "Applied" : "Apply"}
                </Button>
            </div>

            <h2 className="py-2 border-b-2 border-b-gray-300 font-semibold">
                Job Description
            </h2>

            <div className="flex flex-col gap-3 mt-3">
                <p>
                    <span className="font-bold mr-3">Role : </span>
                    {singleJob?.title}
                </p>
                <p>
                    <span className="font-bold  mr-3">Location : </span>
                    {singleJob?.location}
                </p>
                <p>
                    <span className="font-bold  mr-3">Desciption : </span>
                    {singleJob?.description}
                </p>
                <p>
                    <span className="font-bold  mr-3">Experience : </span>
                    {singleJob?.experience} yrs
                </p>
                <p>
                    <span className="font-bold  mr-3">Total Applicants : </span>
                    {singleJob?.applicants?.length}
                </p>
                <p>
                    <span className="font-bold  mr-3">Posted Date : </span>
                    {singleJob?.createdAt.split("T")[0]}
                </p>
            </div>
        </div>
    );
};
