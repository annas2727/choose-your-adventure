import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GenreSelection from './pages/GenreSelection.jsx';
import StoryPage from './pages/StoryPage.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GenreSelection />} />
        <Route path="/story" element={<StoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
