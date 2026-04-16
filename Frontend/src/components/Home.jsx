import { useGetAllJobs } from "../customHooks/useGetAllJobs"
import { HeroSection } from "./HeroSection"
import { LatestJobs } from "./LatestJobs"
import { Footer } from "./shared/Footer"
import Navbar from "./shared/Navbar"

const Home = () => {
  useGetAllJobs();
  return (
    <>
      <Navbar/>
      <HeroSection/>
      <LatestJobs/>
      <Footer/>
    </>
  )
}

export default Home