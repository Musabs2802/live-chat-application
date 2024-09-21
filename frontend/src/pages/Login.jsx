import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/api/auth/login', { username, password })
            console.log(res)
            if (res.status == 200) {
                toast.success("Login Successful !")
                navigate('/')
            }
            else {
                setError('Something is wrong !')
            }
        }
        catch (error) {
            toast.error("Something went wrong !")
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
            <h2 className="card-title text-center">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                <label className="label" htmlFor="username">
                    <span className="label-text">Username</span>
                </label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="input input-bordered"
                    required
                />
                </div>
                <div className="form-control mb-4">
                <label className="label" htmlFor="password">
                    <span className="label-text">Password</span>
                </label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="input input-bordered"
                    required
                />
                </div>
                <Link to='/signup' className='text-sm  hover:underline hover:text-blue-600 mt-2 inline-block'>
                    Don't have an account?
                </Link>
                <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary w-full">
                    Login
                </button>
                </div>
            </form>
            </div>
        </div>
        </div>
    );
};

export default Login;
