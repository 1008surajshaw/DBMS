import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { Routes,Route } from "react-router-dom";
import VerifyEmail from "./pages/VerifyEmail";
import OpenRouter from "./components/OpenRouter";
import { Home } from "./pages/Home";
import CourseInformationForm from "./components/propertieBuilder";
import AddCourse from "./components";
export default function App() {
  return <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}   />
      <Route
          path="verify-email"
          element={
            <OpenRouter>
              <VerifyEmail />
            </OpenRouter>
          }
        /> 
      <Route
        path="addProperties"
         element={<AddCourse/> }
      />
     
    </Routes>
  </div>;
}
