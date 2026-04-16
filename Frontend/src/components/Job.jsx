import { Bookmark } from "lucide-react"
import { Button } from "./ui/button"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { useNavigate } from "react-router-dom"

export const Job = ({job}) => {
    const navigate = useNavigate();

    const getDayAgo = (mongoDbTime) => {
        const createdAt = new Date(mongoDbTime);
        const currentTime = Date.now();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (24*60*60*1000));
    }

    return (
        <div className="border border-gray-200 p-2 rounded-md flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <p className="text-gray-400 text-sm">{getDayAgo(job?.createdAt) === 0 ? 'today' : `${getDayAgo(job?.createdAt)} days ago`}</p>
                <Button className="rounded-full" size="icon" variant="outline"> <Bookmark /> </Button>
            </div>
            <div className="flex gap-2 items-center">
                <Button className="p-6" variant="ourline" size="icon">
                    <Avatar>
                        <AvatarImage src="" />
                    </Avatar>
                </Button>
                <div>
                    <h2 className="font-semibold">{job?.company?.companyName}</h2>
                    <p>{job?.location}</p>
                </div>
            </div>

            <h3 className="font-bold">Title</h3>

            <p className="text-gray-400 ">{job?.description}</p>

            <div className='flex items-center flex-wrap gap-3'>
                <Badge variant='outline' className="text-blue-700">{job?.position} Position</Badge>
                <Badge variant='outline' className="text-purple-700">{job?.jobType}</Badge>
                <Badge variant='outline' className="text-red-500">{job?.salary} LPA</Badge>
            </div>

            <div className="my-2 flex flex-wrap items-center gap-3">
                <Button className="cursor-pointer" onClick={() => navigate(`/description/${job?._id}`)}>Details</Button>
                <Button className="bg-purple-600 text-white cursor-pointer">Save for Later</Button>
            </div>
        </div>
    )
}
