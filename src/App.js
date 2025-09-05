
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ThemeProvider from './ThemeProvider';

import DietPlan from './pages/DietPlan';
import Workout from './pages/Workout';
import Settings from './pages/Settings';

import MainLayout from './components/MainLayout';


function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/diet" element={<DietPlan />} />
              <Route path="/workout" element={<Workout />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
