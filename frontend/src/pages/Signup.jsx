import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
    } else {
      setError('');
      // Handle form submission logic here
      console.log(formData);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="card w-full bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-center">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className='flex gap-2'>
                <div className="form-control mb-4">
                <label className="label" htmlFor="firstName">
                    <span className="label-text">First Name</span>
                </label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                    className="input input-bordered"
                    required
                />
                </div>

                <div className="form-control mb-4">
                <label className="label" htmlFor="lastName">
                    <span className="label-text">Last Name</span>
                </label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                    className="input input-bordered"
                    required
                />
                </div>
            </div>
            
            <div className="form-control mb-4">
              <label className="label" htmlFor="username">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="input input-bordered"
                required
              />
            </div>

            <div className='flex gap-2'>
                <div className="form-control mb-4">
                <label className="label" htmlFor="password">
                    <span className="label-text">Password</span>
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="input input-bordered"
                    required
                />
                </div>

                <div className="form-control mb-4">
                <label className="label" htmlFor="confirmPassword">
                    <span className="label-text">Confirm Password</span>
                </label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="input input-bordered"
                    required
                />
                </div>
            </div>

            <div className="form-control mb-4">
              <label className="label" htmlFor="gender">
                <span className="label-text">Gender</span>
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="select select-bordered max-w-44"
                required
              >
                <option value="" disabled>
                  Select gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {error && (
              <div className="mb-4 text-red-500 text-center">
                {error}
              </div>
            )}

            <Link to={"/login"} className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block' href='#'>
                Already have an account?
            </Link>

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary w-full">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
