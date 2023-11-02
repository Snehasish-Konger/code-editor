import "./App.css";
import Landing from "./pages/Landing";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
// import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Codes from "./pages/Codes";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Error from "./pages/Error";
import Contact from "./pages/Contact";
export default function App() {
  return (
    <>
      <div className="flex flex-col w-full h-full justify-start items-center">
        <Header />
      </div>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        {/* <Route path="/reviews" element={<Testimonials />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/codes" element={<Codes />} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Error/>} />
        <Route path="/about" element={<About/>} />
      </Routes>
      <Footer />
    </>
  );
}