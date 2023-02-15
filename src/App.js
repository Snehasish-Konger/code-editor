import "./App.css";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import history from "./utils/history";
import Header from "./components/Header";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
    <Router history={history}>
    <div className="flex flex-col w-full h-full justify-start items-center">
        <Header />
      </div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
