import axios from 'axios'
import { useEffect } from 'react'
import { JOB_API_END_POINT } from '../utils/apiEndPoint'
import { useDispatch } from 'react-redux'
import { getAllJobs } from '../redux/slicers/jobSlice'

export const useGetAllJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get`, {withCredentials : true});
                if(res.data.success)    dispatch(getAllJobs(res.data.job));
            } catch (error) {
                console.log(error);
            }
        }

        fetchAllJobs();
    }, [])
}
