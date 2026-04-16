import { Link, useNavigate } from "react-router-dom"
import Navbar from "../shared/Navbar"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { RadioGroup } from "../ui/radio-group"
import { useState } from "react"
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/apiEndPoint.js"
import { toast } from "sonner"
import { useDispatch, useSelector } from "react-redux"
import { setLoading } from "../../redux/slicers/authSlice.js"
import { Loader2 } from "lucide-react"

const Signup = () => {
  const [input, setInput] = useState({fullName : "", email : "", phoneNumber : "", password : "", role : ""});

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);

  const changeEventHandler = (e) => {
    setInput((prev) => ({...prev, [e.target.name] : e.target.value}));
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, input, {headers : {'content-type' : 'application/json'}, withCredentials : true});

      toast.success(res.data.message);
      if(res.data.success)  navigate('/login');
    } 
    catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    finally{
      dispatch(setLoading(false));
    }
  }

  return (
    <>
      <Navbar />

      <div className="flex justify-center items-center max-w-7xl mx-auto">

        <form onSubmit={submitHandler} className="w-1/2 border border-gray-200 rounded-md p-4 my-10">

          <h1 className="font-bold text-center text-2xl">SignUp</h1>

          <div className="my-3">
            <Label htmlFor="name" className="mb-2">Full Name : </Label>
            <Input id="name" name="fullName" onChange={changeEventHandler} type="text" placeholder="Abhi" required/>
          </div>

          <div className="my-3">
            <Label htmlFor="email" className="mb-2">Email : </Label>
            <Input id="email" name="email" onChange={changeEventHandler} type="text" placeholder="abhi@gmail.com" required />
          </div>

          <div className="my-3">
            <Label htmlFor="phoneNumber" className="mb-2">Phone Number : </Label>
            <Input id="phoneNumber" name="phoneNumber" onChange={changeEventHandler} type="text" placeholder="798*****12" required/>
          </div>

          <div className="my-3">
            <Label htmlFor="password" className="mb-2">Password : </Label>
            <Input id="password" name="password" onChange={changeEventHandler} type="password" placeholder="*****" required />
          </div>

          <RadioGroup className="flex items-center gap-3 flex-wrap">

            <div className="flex items-center gap-1">
              <Input type="radio" name="role" value="student" className="cursor-pointer" checked={input.role === 'student'} onChange={changeEventHandler}/>
              <Label>Student</Label>
            </div>

            <div className="flex items-center gap-1">
              <Input type="radio" name="role" value="recruiter" className="cursor-pointer" checked={input.role === 'recruiter'} onChange={changeEventHandler}/>
              <Label>Recruiter</Label>
            </div>

          </RadioGroup>

          {
            loading ? <Button className="w-full bg-blue-400 text-2xl py-4 my-4"><Loader2 className="w-4 h-4 mr-2 animate-spin"/> Please Wait...</Button> : <Button type="submit" className="w-full bg-blue-500 text-gray-200 cursor-pointer text-2xl py-4 my-4">SignUp</Button>
          }
          
          <span>Already have an account ? <Link to="/login" className="text-blue-600">Login</Link></span>
        </form>
      </div>
    </>
  )
}

export default Signup