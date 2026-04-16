import { Loader2, Mail, Pen, Phone } from "lucide-react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { AppliedJobTable } from "./AppliedJobTable";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Field, FieldGroup } from "./ui/field"
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { USER_API_END_POINT } from "../utils/apiEndPoint";
import { setLoading, setUser } from "../redux/slicers/authSlice";
import axios from "axios";
import { toast } from "sonner";
import { Input } from "./ui/input";

export const Profile = () => {
    const { user, loading } = useSelector((store) => store.auth);
    const dispatch = useDispatch();

    const [inputs, setInputs] = useState({
        fullName: user?.fullName || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.map(skill => skill) || "",
        resume: user?.profile?.resume || null,
    })

    const changeEventHandler = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }

    const fileChangeHandler = (e) => {
        setInputs({ ...inputs, resume: e.target.files?.[0] });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullName", inputs.fullName);
        formData.append("email", inputs.email);
        formData.append("phoneNumber", inputs.phoneNumber);
        formData.append("bio", inputs.bio);
        formData.append("skills", inputs.skills);
        if(inputs.resume) formData.append("resume", inputs.resume);

        try {
            dispatch(setLoading(true));
            const res = await axios.put(`${USER_API_END_POINT}/profile/update`, formData, { headers: { 'content-type': 'multipart/form-data' }, withCredentials: true });
            toast.success(res.data.message);

            if(res.data.success) 
                dispatch(setUser(res.data.user));

        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        }
        finally {
            dispatch(setLoading(false));
        }
    }

    return (
        <>
            <Navbar />
            <div className="px-4">
                <div className="bg-white border border-gray-200 p-4 flex gap-4 flex-col max-w-3xl mx-auto rounded-md my-4">
                    <div className="flex justify-between">
                        <div className="flex gap-4 p-2">
                            <Avatar className="cursor-pointer">
                                <AvatarFallback className="font-bold">{user?.fullName?.slice(0,1)}</AvatarFallback> 
                            </Avatar>
                            <div>
                                <h2 className="font-semibold text-xl">{user?.fullName}</h2>
                                <p className="text-gray-400 text-md">{user?.profile?.bio ? user?.profile?.bio : "NA"}</p>
                            </div>
                        </div>

                        <Dialog>
                            <DialogTrigger asChild>
                                <Pen variant="outline" className="cursor-pointer" />
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-sm">
                                <form onSubmit={submitHandler}>
                                    <DialogHeader>
                                        <DialogTitle>Edit profile</DialogTitle>
                                    </DialogHeader>
                                    <FieldGroup className="my-3">
                                        <Field>
                                            <Label htmlFor="name">Name</Label>
                                            <Input type="text" id="name" name="fullName" value={inputs?.fullName} onChange={changeEventHandler} />
                                        </Field>
                                        <Field>
                                            <Label htmlFor="email">Email</Label>
                                            <Input type="email" id="email" name="email" value={inputs?.email} onChange={changeEventHandler} />
                                        </Field>
                                        <Field>
                                            <Label htmlFor="num">Number</Label>
                                            <Input type="text" id="num" name="phoneNumber" value={inputs?.phoneNumber} onChange={changeEventHandler} />
                                        </Field>
                                        <Field>
                                            <Label htmlFor="bio">Bio</Label>
                                            <Input type="text" id="bio" name="bio" value={inputs?.bio} onChange={changeEventHandler} />
                                        </Field>
                                        <Field>
                                            <Label htmlFor="skills">Skills</Label>
                                            <Input type="text" id="skills" name="skills" value={inputs?.skills} onChange={changeEventHandler} />
                                        </Field>
                                        <Field>
                                            <Label htmlFor="resume">Resume</Label>
                                            <Input type="file" id="resume" name="resume" onChange={fileChangeHandler} accept="application/pdf" />
                                        </Field>
                                    </FieldGroup>
                                    <DialogFooter>
                                        {
                                            loading ? <Button disabled={loading}><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Please Wait...</Button> : <Button type="submit" className="cursor-pointer"> Save changes </Button>
                                        }
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <div className="flex flex-col gap-3">
                        <div className="flex gap-3 items-center">
                            <Mail className="h-4 w-4" />
                            <span>{user?.email}</span>
                        </div>
                        <div className="flex gap-3 items-center">
                            <Phone className="h-4 w-4" />
                            <span>{user?.phoneNumber}</span>
                        </div>
                    </div>

                    <div>
                        <Label className="font-semibold mb-2">skills</Label>
                        <div className="flex gap-3 items-center flex-wrap">
                            {
                                user?.profile?.skills?.length === 0 ? <span>NA</span> : user?.profile?.skills?.map((item, index) => <Button key={index}> <Badge className="text-[15px]">{item}</Badge> </Button>)
                            }
                        </div>
                    </div>

                    <div>
                        <Label className="font-semibold mb-2">Resume</Label>
                        {
                            user?.profile?.resume ? <a target="blank" href={user?.profile?.resume} className="text-blue-400">{user?.profile?.resumeName}</a> : <span>NA</span>
                        }
                    </div>
                </div>

                <div className="max-w-3xl mx-auto my-4 bg-white">
                    <h3 className="font-bold text-xl my-3">Applied Jobs</h3>
                    <AppliedJobTable />
                </div>
            </div>
        </>
    )
}
