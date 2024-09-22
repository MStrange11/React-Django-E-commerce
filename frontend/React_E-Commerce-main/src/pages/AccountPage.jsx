import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components";

const AccountPage = () => {

    const navigate = useNavigate()
    const [profileUser, setUser] = useState({});

    useEffect(() => {
        // Fetch user details from cookies (assuming the cookie stores name and email)
        const user = Cookies.get("user");

        if (user) {
            try {
                setUser(JSON.parse(user))
            } catch (err) {
                handleLogout()
            }
        } else {
            // If no user details, redirect to login
            navigate("/login");

        }
    }, []);

    const handleLogout = () => {
        // Remove authentication cookies
        Cookies.remove("userToken"); // Assuming this is your auth token
        Cookies.remove("user");

        // Redirect to login page
        navigate("/login");
    };

    return (<>
        <Navbar />
        <div className="account-page min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="account-box p-6 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Account Details</h1>
                <div className="user-info space-y-4">
                    <div className="name text-lg">
                        <span className="font-semibold">Name: </span>
                        {profileUser ? profileUser.username : "username"}
                    </div>
                    <div className="email text-lg">
                        <span className="font-semibold">Email: </span>
                        {profileUser ? profileUser.email : "email"}
                    </div>
                </div>

                <button
                    className="my-4 py-2 px-6 w-full bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition duration-200"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>

    </>
    );
};

export default AccountPage;
