import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { baseURL } from '../components/AxiosSetup';

import { Footer, Navbar } from "../components";
import axios from "axios";
import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate()
  const [loginDetails, setLoginDetails] = useState({});
  const [error, setError] = useState('');

  function loginChangeHandler(e) {
    const { name, value } = e.target;
    setLoginDetails({ ...loginDetails, [name]: value });
  }

  function post_login(e) {
    e.preventDefault()
    axios.post(baseURL + 'login/', loginDetails)
      .then((res) => {
        Cookies.set("userToken", res.data.token, { expires: 1 });
        Cookies.set("user", JSON.stringify({...loginDetails, email : res.data.email}), { expires: 1 });
        navigate('/')
      })
      .catch((err) => {
        console.log(err);
        setError(err);

      })
  }
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        <div class="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={post_login}>
              <div class="my-3">
                <label for="display-4">Username</label>
                <input
                  type="text"
                  class="form-control"
                  id="name-input"
                  placeholder="username"
                  name="username"
                  onChange={loginChangeHandler}
                />
              </div>
              <div class="my-3">
                <label for="floatingPassword display-4">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  name="password"
                  onChange={loginChangeHandler}

                />
              </div>
              <div className="my-3">
                <p>New Here? <Link to="/register" className="text-decoration-underline text-info">Register</Link> </p>
              </div>
              <div className="text-center">
                <button class="my-2 mx-auto btn btn-dark" type="submit">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
