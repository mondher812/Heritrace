import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";
import RotatingFlagsLoader from "./pages/loading_page";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/loading" element={<RotatingFlagsLoader />} />
      </Routes>
    </Router>
  );
}

export default App;