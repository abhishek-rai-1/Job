import { Link, useNavigate } from "react-router-dom"
import Navbar from "../shared/Navbar"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { RadioGroup } from "../ui/radio-group"
import { useState } from "react"
import { toast } from "sonner"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { USER_API_END_POINT } from "../../utils/apiEndPoint"
import { setLoading, setUser } from "../../redux/slicers/authSlice.js"
import { Loader2 } from "lucide-react"

const Login = () => {
  const [input, setInput] = useState({ email: "", password: "", role: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);

  const changeEventHandler = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, { headers: { 'content-type': 'application/json' }, withCredentials: true });

      toast.success(res.data.message);

      if(res.data.success) {
        dispatch(setUser(res.data.user));
        navigate('/');
      }
    }
    catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    finally {
      dispatch(setLoading(false));
    }
  }

  return (
    <>
      <Navbar />

      <div className="flex justify-center items-center max-w-7xl mx-auto">

        <form onSubmit={submitHandler} className="w-1/2 border border-gray-200 rounded-md p-4 my-10">

          <h1 className="font-bold text-center text-2xl">Login</h1>

          <div className="my-3">
            <Label htmlFor="email" className="mb-2">Email : </Label>
            <Input id="email" name="email" onChange={changeEventHandler} type="text" placeholder="abhi@gmail.com" required />
          </div>

          <div className="my-3">
            <Label htmlFor="password" className="mb-2">Password : </Label>
            <Input id="password" name="password" onChange={changeEventHandler} type="password" placeholder="*****" required />
          </div>

          <RadioGroup className="flex items-center gap-3 flex-wrap">

            <div className="flex items-center gap-1">
              <Input type="radio" name="role" value="student" className="cursor-pointer" checked={input.role === 'student'} onChange={changeEventHandler} />
              <Label>Student</Label>
            </div>

            <div className="flex items-center gap-1">
              <Input type="radio" name="role" value="recruiter" className="cursor-pointer" checked={input.role === 'recruiter'} onChange={changeEventHandler} />
              <Label>Recruiter</Label>
            </div>

          </RadioGroup>

          {
            loading ? <Button disabled ={loading} className="w-full bg-blue-400 text-2xl py-4 my-4"><Loader2 className="w-4 h-4 mr-2 animate-spin"/> Please Wait...</Button> : <Button type="submit" className="w-full bg-blue-500 text-gray-200 cursor-pointer text-2xl py-4 my-4">Login</Button>
          }

          <span>don't have an account ? <Link to="/signup" className="text-blue-600">SignUp</Link></span>
        </form>
      </div>
    </>
  )
}

export default Login