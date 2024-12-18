import axios from "axios";
import { useAuthContext } from '../context/authContext';
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProfileEdit = () => {
    const { authUser, setAuthUser } = useAuthContext();
    const [ isModalOpen, setModelOpen ] = useState(false);
    const [confirmUsername, setConfirmUsername] = useState("");


  const [profile, setProfile] = useState({
    displayPic: '',
    username: '',
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  useEffect(() => {
    const fetchProfileData = async () => {
        axios.get(`${import.meta.env.VITE_SERVER_URL}/user/me`, { headers: { Authorization: `Bearer ${authUser.accessToken}` } })
        .then((res) => {
            setProfile(res.data.user)
        })
        .catch((error) => {
            if(error.response.status === 500) {
                toast.error("Something is wrong!")
            }
            else {
                toast.error(error.response.data.message)
            }
        })
    } 
    
    fetchProfileData()
  }, [])

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile({
        ...profile,
        displayPic: URL.createObjectURL(file),
      });
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match');
    }
    else {

    }
    }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here, e.g., API calls
    alert("Profile updated successfully!");
  };

  const handleLogout = () => {
    localStorage.removeItem("authUser");
    setAuthUser(null);
    toast.success("User Logged out");
    navigate("/login");
};

const handleAccountDelete = () => {
    if (confirmUsername !== profile.username) {
        toast.error("Username do not match !")
    }
    else {
        handleLogout()
    }
}
  return (
    <div className="flex flex-col h-screen w-full">
        <div className="flex-1 overflow-y-auto p-4 bg-gray-800 items-center justify-center">
        <div className="p-4 text-white">
            <h2 className="card-title text-center mb-6 justify-center">Profile</h2>

            {/* Profile Section */}
            <div className="mb-10 flex justify-start items-center">
                <div>
                <label htmlFor="displayPic" className="cursor-pointer">
                <img
                    src={profile.displayPic}
                    alt="Profile"
                    className="rounded-full w-28 h-28 object-cover"
                />
                <input
                    type="file"
                    id="displayPic"
                    name="displayPic"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />
                </label>
                </div>
                <div className="mx-8">
                    <h5 className="text-sm font-medium text-start">Username</h5>
                    <h5 className="text-sm text-start">@{profile.username}</h5>
                </div>
            </div>
            
            <form onSubmit={handleProfileSubmit}>
                <div className="mb-4 flex space-x-4">
                    <div className="w-1/2">
                    <label htmlFor="firstName" className="block text-sm font-medium">
                        First Name
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={profile.firstName}
                        onChange={handleProfileChange}
                        className="w-full p-2 mt-1 text-sm rounded-md bg-gray-600 border border-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    </div>
                    <div className="w-1/2">
                    <label htmlFor="lastName" className="block text-sm font-medium">
                        Last Name
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={profile.lastName}
                        onChange={handleProfileChange}
                        className="w-full p-2 mt-1 text-sm rounded-md bg-gray-600 border border-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    </div>
                </div>

                <div className="mb-4 flex space-x-4">
                    <div className="w-1/2">
                        <label htmlFor="gender" className="block text-sm font-medium">
                        Gender
                        </label>
                        <select
                        id="gender"
                        name="gender"
                        value={profile.gender}
                        onChange={handleProfileChange}
                        className="w-full p-2 mt-1 text-sm rounded-md bg-gray-600 border border-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="w-1/2">
                        <label htmlFor="dob" className="block text-sm font-medium">
                        Date of Birth
                        </label>
                        <input
                        type="date"
                        id="dob"
                        name="dob"
                        value={profile.dob}
                        onChange={handleProfileChange}
                        className="w-full p-2 mt-1 text-sm rounded-md bg-gray-600 border border-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
                <div className="flex justify-end mt-5">
                    <button
                    type="submit"
                    className="bg-blue-600 text-white text-sm py-2 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                    Save
                    </button>
                </div>
                </form>

            <hr className="my-6 border-t border-gray-600" />

            <form onSubmit={handlePasswordSubmit}>
            {/* Change Password Section */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-6">Change Password</h3>

                    <div className="mb-4">
                    <label htmlFor="currentPassword" className="block text-sm font-medium">
                        Current Password
                    </label>
                    <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        placeholder="•••••"
                        value={profile.currentPassword}
                        onChange={handlePasswordChange}
                        className="w-full p-2 mt-1 text-sm rounded-md bg-gray-600 border border-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    </div>

                    <div className="mb-4 flex space-x-4">
                        <div className="w-1/2">
                            <label htmlFor="newPassword" className="block text-sm font-medium">
                            New Password
                            </label>
                            <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            placeholder="•••••"
                            value={profile.newPassword}
                            onChange={handlePasswordChange}
                            className="w-full p-2 mt-1 text-sm rounded-md bg-gray-600 border border-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            />
                        </div>

                        <div className="w-1/2">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium">
                            Confirm New Password
                            </label>
                            <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="•••••"
                            value={profile.confirmPassword}
                            onChange={handlePasswordChange}
                            className="w-full p-2 mt-1 text-sm rounded-md bg-gray-600 border border-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end mt-5">
                    <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-6 text-sm rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                    Update Password
                    </button>
                </div>
            </form>

            <hr className="my-6 border-t border-gray-600" />
            
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-6">Account Settings</h3>

                    {/* Logout Section */}
                    <div className="flex mb-10 justify-between items-center">
                        <p className="text-sm text-gray-400 mb-2">
                            Log out of this account.
                        </p>
                        <button
                        onClick={handleLogout}
                        className="bg-blue-600 text-white py-2 px-6 text-sm rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Logout
                        </button>
                    </div>

                    {/* Delete Account Section */}
                    <div className="flex mb-4 justify-between items-center">
                        <p className="text-sm text-red-400 mb-2 font-medium">
                            Deleting your account will permanently remove all your data and cannot be undone.
                        </p>
                        <button
                        onClick={() => setModelOpen(true)}
                        className="bg-red-700 text-white py-2 px-6 text-sm rounded-lg hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                        Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
        {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-700 p-6 rounded-lg w-96 shadow-lg">
            <h4 className="text-lg font-semibold text-white mb-4">
              Confirm Account Deletion
            </h4>
            <p className="text-sm text-gray-300 mb-4">
              Please type your username (<span className="font-bold">{profile.username}</span>) to confirm account deletion. This action is irreversible.
            </p>
            <input
              type="text"
              value={confirmUsername}
              onChange={(e) => setConfirmUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full p-2 mb-4 text-sm rounded-md bg-gray-600 border border-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setModelOpen(false)}
                className="py-2 px-4 text-sm bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAccountDelete}
                className="py-2 px-4 text-sm bg-red-700 text-white rounded-lg hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileEdit;
