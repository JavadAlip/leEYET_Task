import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/register1';
import Login from './pages/login';
import Dashboard from './pages/dashborad';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
};

export default App;
