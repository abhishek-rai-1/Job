import { useSelector } from "react-redux";
import { FilteredCard } from "./FilteredCard"
import { Job } from "./Job"
import Navbar from "./shared/Navbar"

export const Jobs = () => {
    const {allJobs} = useSelector((store) => store.job);

    return (
        <>
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 mt-5">
                <div className="flex gap-4">
                    <div className="w-[20%] bg-gray-50 border border-gray-200 rounded-md p-3">
                        <FilteredCard />
                    </div>
                    {
                        allJobs.length <= 0 ? <span>Job not found</span> : (
                            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    {
                                        allJobs.map((job, index) => <Job key={index} job={job}/>)
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}
