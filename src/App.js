
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Races from './pages/Races';
import Drivers from './pages/Drivers';
import Teams from './pages/Teams';
import Standings from './pages/Standings';
import QualifyingPage from './componets/RaceDetails';

function App() {
  return (

    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/races' element={<Races />} />
          <Route path='/drivers' element={<Drivers />} />
          <Route path='/teams' element={<Teams />} />
          <Route path='/standings' element={<Standings />} />
          <Route path='/races/qualifying' element={<QualifyingPage />} />

        </Routes>

      </div>
    </Router>
  );
}

export default App;
