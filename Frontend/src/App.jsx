import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from "./components/Home"
import { Jobs } from "./components/Jobs"
import { Brose } from "./components/Brose"
import { Profile } from "./components/Profile"
import { JobDetail } from "./components/JobDetail"

const AppRouter = createBrowserRouter([
  {
    path : '/',
    element : <Home/>
  },
  {
    path : '/login',
    element : <Login/>
  },
  {
    path : '/signup',
    element : <Signup/>
  },
  {
    path : '/jobs',
    element : <Jobs/>
  },
  {
    path : '/browse',
    element : <Brose/>
  },
  {
    path : '/profile',
    element : <Profile/>
  },
  {
    path : '/description/:id',
    element : <JobDetail/>
  }
])

function App() {
  return (
    <RouterProvider router={AppRouter}/>
  )
}

export default App
