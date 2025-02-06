import { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for redirection
import axios from './../axios';  // Import axios instance

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();  // Initialize useNavigate

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/users/register', { name, email, password });
            alert('Registration Successful');
            navigate('/login');  // Redirect to the login page after successful registration
        } catch (error) {
            console.error(error);
            alert('Registration Failed');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-semibold mb-4 text-center">Create an Account</h2>
                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <input 
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            placeholder="Name" 
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="Email" 
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="Password" 
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Register
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-500">
                    Already have an account? <a href="/login" className="text-blue-500 hover:text-blue-600">Login here</a>
                </p>
            </div>
        </div>
    );
};

export default Register;
