import { useNavigate } from 'react-router-dom'
import { Badge } from './ui/badge'

export const LatestJobCard = ({job}) => {
  const navigate = useNavigate();

  return (
    <div className='bg-white border border-gray-200 cursor-pointer shadow-xl flex flex-col gap-2 p-3 rounded-md hover:scale-105 transition-transform' onClick={() => navigate(`/description/${job?._id}`)}>
      <h2 className='font-medium text-xl'>{job?.company?.companyName}</h2>
      <p className='text-sm text-gray-600'>{job?.location}</p>
      <h3 className='text-lg font-semibold'>{job?.title}</h3>
      <p className='text-sm text-gray-600'>{job?.description}</p>
      <div className='flex items-center flex-wrap gap-3'>
        <Badge variant='outline' className="text-blue-700">{job?.position} Position</Badge>
        <Badge variant='outline' className="text-purple-700">{job?.jobType}</Badge>
        <Badge variant='outline' className="text-red-500">{job?.salary} LPA</Badge>
      </div>
    </div>
  )
}
