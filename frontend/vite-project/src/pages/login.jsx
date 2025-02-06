// import { useState } from 'react';
// import axios from './../axios';  // Import axios instance

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('/users/login', { email, password });
//             const token = response.data.token;
//             localStorage.setItem('authToken', token);  // Save token to localStorage
//             alert('Login successful');
//             // You can redirect to a dashboard or home page here using navigate
//         } catch (error) {
//             console.error(error);
//             alert('Login failed');
//         }
//     };

//     return (
//         <div className="flex justify-center items-center min-h-screen bg-gray-100">
//             <div className="bg-white p-8 rounded-lg shadow-lg w-96">
//                 <h2 className="text-2xl font-semibold mb-4 text-center">Login to Your Account</h2>
//                 <form onSubmit={handleLogin} className="space-y-4">
//                     <div>
//                         <input 
//                             type="email" 
//                             value={email} 
//                             onChange={(e) => setEmail(e.target.value)} 
//                             placeholder="Email" 
//                             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                     </div>
//                     <div>
//                         <input 
//                             type="password" 
//                             value={password} 
//                             onChange={(e) => setPassword(e.target.value)} 
//                             placeholder="Password" 
//                             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                     </div>
//                     <button 
//                         type="submit" 
//                         className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                         Login
//                     </button>
//                 </form>
//                 <p className="mt-4 text-center text-sm text-gray-500">
//                     Don't have an account? <a href="/register" className="text-blue-500 hover:text-blue-600">Register here</a>
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default Login;


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import axios from './../axios';  // Import axios instance

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();  // Initialize useNavigate

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/users/login', { email, password });
            const token = response.data.token;
            localStorage.setItem('authToken', token);  // Save token to localStorage
            alert('Login successful');
            navigate('/dashboard');  // Redirect to dashboard on success
        } catch (error) {
            console.error(error);
            alert('Login failed');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-semibold mb-4 text-center">Login to Your Account</h2>
                <form onSubmit={handleLogin} className="space-y-4">
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
                        Login
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-500">
                    Don't have an account? <a href="/register" className="text-blue-500 hover:text-blue-600">Register here</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
