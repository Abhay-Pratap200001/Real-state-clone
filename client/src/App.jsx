import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from "react-hot-toast";
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Header from './components/Header';
import About from './pages/About'
import PrivateRoute from './components/PrivateRoute';
import CreateListing from './pages/CreateListing';
import UpdateListing from './pages/UpdateListing';
import Listing from './pages/Listing'
import Search from './pages/Search';
import SmoothScroll from './Animation/SmoothScroll';



const App = () => {
  return <BrowserRouter>
  <SmoothScroll>
  <Header/>
  <Toaster/>
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/sign-in' element={<SignIn/>}/>
    <Route path='/sign-up' element={<SignUp/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/listing/:listingId' element={<Listing/>}/>  {/* accepting listing bases of listing._id */}
    <Route path='/search' element={<Search/>}/>


    {/* protected route */}
  <Route element={<PrivateRoute/>}>
    <Route path='/profile' element={<Profile/>}/>
    <Route path='/create-listing' element={<CreateListing/>}/>
    <Route path='/update-listing/:listingId' element={<UpdateListing/>}/> 
  </Route>
  {/* protected route */}


  </Routes>
</SmoothScroll>
</BrowserRouter>
}

export default App