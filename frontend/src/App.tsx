import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/landing';
import RotatingFlagsLoader from './pages/loading_page';
import NewLanding from './pages/new_landing'
import NewPage from './pages/new_page';


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<NewLanding />} />
        <Route path="/name" element={<Landing />} />
        <Route path="/loading" element={<RotatingFlagsLoader />} />
        <Route path="/new-page" element={<NewPage />} />
      </Routes>
    </Router>
  );
}

export default App;