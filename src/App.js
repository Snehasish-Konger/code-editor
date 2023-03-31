import "./App.css";
import Landing from "./pages/Landing";
import Header from "./components/Header";
import {
  
  Routes,
  Route,
} from "react-router-dom";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

function App() {
  return (
    <>
    
    <div className="flex flex-col w-full h-full justify-start items-center">
        <Header />
      </div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/reviews" element={<Testimonials/>} />
      </Routes>
    <Footer/>
    </>
  );
}

export default App;
