import { Avatar, AvatarFallback } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { useDispatch, useSelector } from "react-redux";
import { LogOut, User2 } from "lucide-react";
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '../../utils/apiEndPoint';
import { setUser } from '../../redux/slicers/authSlice';
import { toast } from 'sonner';

const Navbar = () => {
    const { user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`);
            toast.success(res.data.message);
            if(res.data.success){
                dispatch(setUser(null));
                navigate('/');
            }
        } catch (error) {
           console.log(error); 
        }
    }

    return (
        <div className='flex justify-between items-center flex-wrap mx-auto max-w-7xl h-16 px-4'>
            <h1 className='sm:text-center text-2xl font-bold'><span className='text-[#F83002]'>H</span>unter<span className='text-[#F83002]'>s</span></h1>
            <div className='flex gap-4 items-center'>
                {
                    !user ? (
                        <div className='flex gap-4 items-center'>
                            <Link to="/login">
                                <Button variant='outline' className="cursor-pointer">Login</Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="bg-[#6A38C2] hover:bg-[#491f91] cursor-pointer">SignUp</Button>
                            </Link>
                        </div>
                    ) : (
                        <>
                            <ul className='flex items-center gap-5 font-medium'>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/jobs">Jobs</Link></li>
                                <li><Link to="/Browse">Browse</Link></li>
                            </ul>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarFallback className="font-bold">{user?.fullName.slice(0, 1)}</AvatarFallback>
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div className='flex item-center gap-2 space-y-2'>
                                        <Avatar>
                                            <AvatarFallback className="font-bold">{user?.fullName.slice(0, 1)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h4 className='font-medium'>{user.fullName}</h4>
                                            <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <div className='flex gap-3 items-center'>
                                            <User2 />
                                            <Button variant='link' className="cursor-pointer">
                                                <Link to="/profile">View Profile</Link>
                                            </Button>
                                        </div>
                                        <div className='flex gap-3 items-center'>
                                            <LogOut />
                                            <Button variant='link' onClick={logoutHandler} className="cursor-pointer">Logout</Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default Navbar