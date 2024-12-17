import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        gender: '',
        dob: '',
        password: '',
        confirmPassword: '',
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
        } else {
            setError('');
            try {
                const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/signup`, { ...formData });
                if (res.status === 201) {
                    toast.success("User registered successfully!");
                    navigate('/login');
                } else {
                    // TODO: Show error message
                    setError('Something went wrong!');
                }
            } catch (error) {
                console.log("Error", error);
                toast.error("An error occurred during signup!");
            }
        }
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen w-full">
            {/* Left Side - Slanted Panel */}
            <div className="relative w-full md:w-1/2 bg-gradient-to-br from-green-600 via-teal-500 to-blue-500 text-white overflow-hidden">
                <div className="absolute inset-0 transform -skew-y-6 bg-gradient-to-br from-green-700 via-teal-600 to-blue-600 opacity-50"></div>
                <div className="relative flex flex-col justify-center items-center h-full p-10 text-center">
                    <h1 className="text-4xl font-bold mb-4 leading-tight">
                        Join the Anonymous Community 🌍
                    </h1>
                    <p className="text-lg max-w-md mb-6">
                        Experience secure and anonymous chats with <span className="font-extrabold">Invisible</span> by CodeHabitat.
                    </p>
                </div>
            </div>

            {/* Right Side - Signup Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-gray-100">
                <div className="card w-full max-w-xl bg-white shadow-2xl rounded-lg border-t-4 border-green-500">
                    <div className="card-body p-6">
                        <h2 className="text-center text-4xl font-extrabold text-gray-800 mb-2">
                            Sign Up
                        </h2>
                        <p className="text-center text-sm text-gray-600 mb-6">
                            Create your account and join us anonymously.
                        </p>
                        <form onSubmit={handleSubmit}>
                            {/* First Name and Last Name */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="form-control">
                                    <label className="label" htmlFor="firstName">
                                        <span className="label-text font-medium text-gray-700">First Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        placeholder="Enter your first name"
                                        className="input input-bordered rounded-lg px-4 py-2 shadow-inner bg-gray-50"
                                        required
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label" htmlFor="lastName">
                                        <span className="label-text font-medium text-gray-700">Last Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        placeholder="Enter your last name"
                                        className="input input-bordered rounded-lg px-4 py-2 shadow-inner bg-gray-50"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Username */}
                            <div className="form-control mb-4">
                                <label className="label" htmlFor="username">
                                    <span className="label-text font-medium text-gray-700">Username</span>
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    placeholder="Choose a username"
                                    className="input input-bordered rounded-lg px-4 py-2 shadow-inner bg-gray-50"
                                    required
                                />
                            </div>

                            {/* Gender and DOB */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="form-control">
                                    <label className="label" htmlFor="gender">
                                        <span className="label-text font-medium text-gray-700">Gender</span>
                                    </label>
                                    <select
                                        id="gender"
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        className="select select-bordered rounded-lg shadow-inner bg-gray-50"
                                        required
                                    >
                                        <option value="" disabled>Select gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div className="form-control">
                                    <label className="label" htmlFor="dob">
                                        <span className="label-text font-medium text-gray-700">Date of Birth</span>
                                    </label>
                                    <input
                                        type="date"
                                        id="dob"
                                        name="dob"
                                        value={formData.dob}
                                        onChange={handleChange}
                                        className="input input-bordered rounded-lg px-4 py-2 shadow-inner bg-gray-50"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password and Confirm Password */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="form-control">
                                    <label className="label" htmlFor="password">
                                        <span className="label-text font-medium text-gray-700">Password</span>
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        className="input input-bordered rounded-lg px-4 py-2 shadow-inner bg-gray-50"
                                        required
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label" htmlFor="confirmPassword">
                                        <span className="label-text font-medium text-gray-700">Confirm Password</span>
                                    </label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Confirm your password"
                                        className="input input-bordered rounded-lg px-4 py-2 shadow-inner bg-gray-50"
                                        required
                                    />
                                </div>
                            </div>

                            {error && <div className="text-red-500 text-sm text-center mb-4">{error}</div>}

                            <Link to="/login" className="text-sm text-blue-500 hover:underline mt-2 inline-block">
                                Already have an account? Log in
                            </Link>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 w-full border-none">
                                    Sign Up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
