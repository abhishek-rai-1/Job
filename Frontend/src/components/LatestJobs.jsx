import { useSelector } from "react-redux"
import { LatestJobCard } from "./LatestJobCard"

export const LatestJobs = () => {
    const {allJobs} = useSelector((store) => store.job); 

    return (
        <div className="max-w-7xl mx-auto my-10">
            <h2 className="text-4xl font-bold px-4"><span className="text-[#6A38C2]">Latest & Top</span> Job Openings</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-col-4 my-4 gap-5 px-4">
                {
                    allJobs.length <= 0 ? <span>No job Available</span> : allJobs.slice(0,6).map((job, index) => <LatestJobCard key={index} job={job}/>)
                }
            </div>
        </div>
    )
}
