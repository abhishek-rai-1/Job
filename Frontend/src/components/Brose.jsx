import { Job } from "./Job";
import Navbar from "./shared/Navbar"

export const Brose = () => {
  const randomJobs = [1, 2, 3, 4, 5, 6];

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto p-4">
        <h1 className="font-bold text-xl mb-5">Search Results ({randomJobs.length})</h1>
        <div className="grid grid-cols-3 gap-4">
          {
            randomJobs.map((item, index) => <Job />)
          }
        </div>
      </div>
    </>
  )
}
