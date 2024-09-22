import React, { useState } from 'react'
import { Footer, Navbar } from "../components";
import { Link ,useNavigate} from 'react-router-dom';
import { baseURL } from '../components/AxiosSetup';
import axios from 'axios';
const Register = () => {
    const navigate = useNavigate()
    const [registrationDetails, setRegistrationDetails] = useState({});

    function registerChangeHandler(e) {
        const { name, value } = e.target;
        setRegistrationDetails({ ...registrationDetails, [name]: value });
    }

    function post_register(e) {
        e.preventDefault()
        axios.post(baseURL + 'register/', registrationDetails)
            .then((res) => {
                console.log(res.data);
                navigate('/login')
            })
            .catch((err) => {
                console.log(err);

            })
    }

    return (
        <>
            <Navbar />
            <div className="container my-3 py-3">
                <h1 className="text-center">Register</h1>
                <hr />
                <div class="row my-4 h-100">
                    <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                        <form onSubmit={post_register}>
                            <div class="form my-3">
                                <label for="Name">Full Name</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="Name"
                                    placeholder="Enter Your Name"
                                    name='username'
                                    onChange={registerChangeHandler}
                                />
                            </div>
                            <div class="form my-3">
                                <label for="Email">Email address</label>
                                <input
                                    type="email"
                                    class="form-control"
                                    id="Email"
                                    placeholder="name@example.com"
                                    name='email'
                                    onChange={registerChangeHandler}
                                />
                            </div>
                            <div class="form  my-3">
                                <label for="Password">Password</label>
                                <input
                                    type="password"
                                    class="form-control"
                                    id="Password"
                                    placeholder="Password"
                                    name='password'
                                    onChange={registerChangeHandler}
                                />
                            </div>
                            <div className="my-3">
                                <p>Already has an account? <Link to="/login" className="text-decoration-underline text-info">Login</Link> </p>
                            </div>
                            <div className="text-center">
                                <button class="my-2 mx-auto btn btn-dark" type="submit" >
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Register