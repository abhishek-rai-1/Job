import { Search } from "lucide-react"

export const HeroSection = () => {
    return (
        <div className="max-w-7xl flex flex-col items-center gap-5 mt-4 text-center mx-auto">
            <p className="text-red-400 bg-gray-100 border rounded-full border-gray-200 px-4">No. 1 Job Hunters website</p>
            <h1 className="text-5xl font-bold px-4">Search, Apply & <br />Get Your <span className="text-[#6A38C2]">Dream Job</span></h1>
            <p className="px-4">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis, officiis.</p>
            <div className="border border-gray-300 flex w-[40%] items-center justify-between shadow-lg rounded-md gap-4 mx-auto">
                <input type="text" className="outline-none border-none w-full text-2xl p-2" placeholder="Find your dream jobs" />
                <Search className="h-5 w-5 text-blue-600 cursor-pointer mr-3"/>
            </div>
        </div>
    )
}