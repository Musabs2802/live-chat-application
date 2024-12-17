import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/authContext';

const Login = () => {
    const navigate = useNavigate();
    const { setAuthUser } = useAuthContext();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/login`, { username, password });
            if (res.status === 200) {
                localStorage.setItem("authUser", JSON.stringify(res.data));
                setAuthUser(res.data);

                toast.success("Login Successful!");
                navigate('/');
            } else {
                // TODO: Show error message
                toast.error("Something is wrong!");
            }
        } catch (error) {
            console.log("Error", error);
            toast.error("Something went wrong!");
        }
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen w-full">
            {/* Left Side - Login Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-gray-100">
                <div className="card w-96 bg-white shadow-2xl rounded-lg border-t-4 border-blue-500">
                    <div className="card-body p-6">
                        <h2 className="text-center text-4xl font-extrabold text-gray-800 mb-2">
                            Log In
                        </h2>
                        <p className="text-center text-sm text-gray-600 mb-6">
                            Join the world of anonymous chats.
                        </p>
                        <form onSubmit={handleSubmit}>
                            <div className="form-control mb-4">
                                <label className="label" htmlFor="username">
                                    <span className="label-text font-medium text-gray-700">Username</span>
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter your username"
                                    className="input input-bordered rounded-lg px-4 py-2 shadow-inner bg-gray-50"
                                    required
                                />
                            </div>
                            <div className="form-control mb-4">
                                <label className="label" htmlFor="password">
                                    <span className="label-text font-medium text-gray-700">Password</span>
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="input input-bordered rounded-lg px-4 py-2 shadow-inner bg-gray-50"
                                    required
                                />
                            </div>
                            <Link to='/signup' className='text-sm text-blue-500 hover:underline mt-2 inline-block'>
                                Don't have an account? Sign up
                            </Link>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 w-full border-none">
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Right Side - Slanted Panel */}
            <div className="relative w-full md:w-1/2 bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 text-white overflow-hidden">
                {/* Slanted Effect */}
                <div className="absolute inset-0 transform -skew-y-6 bg-gradient-to-br from-purple-700 via-pink-600 to-red-600 opacity-50"></div>
                <div className="relative flex flex-col justify-center items-center h-full p-10 text-center">
                    <h1 className="text-4xl font-bold mb-4 leading-tight">
                        Connect Anonymously <br /> With the World 🌎
                    </h1>
                    <p className="text-lg max-w-md mb-6">
                        Welcome to <span className="font-extrabold">Invisible</span> by CodeHabitat, 
                        a secure platform to chat without identity.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg">
                        <div className="bg-white bg-opacity-20 backdrop-blur-sm p-4 rounded-lg shadow-lg">
                            <h2 className="text-xl font-bold">🌟 Safe & Anonymous</h2>
                            <p className="text-sm mt-2">Chat freely without revealing your identity.</p>
                        </div>
                        <div className="bg-white bg-opacity-20 backdrop-blur-sm p-4 rounded-lg shadow-lg">
                            <h2 className="text-xl font-bold">⏳ Chats Auto-Delete</h2>
                            <p className="text-sm mt-2">Conversations vanish every hour for privacy.</p>
                        </div>
                        <div className="bg-white bg-opacity-20 backdrop-blur-sm p-4 rounded-lg shadow-lg">
                            <h2 className="text-xl font-bold">🤝 Global Connectivity</h2>
                            <p className="text-sm mt-2">Connect with people worldwide, anonymously.</p>
                        </div>
                        <div className="bg-white bg-opacity-20 backdrop-blur-sm p-4 rounded-lg shadow-lg">
                            <h2 className="text-xl font-bold">✨ Simple & Fun</h2>
                            <p className="text-sm mt-2">Enjoy easy and meaningful conversations.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
