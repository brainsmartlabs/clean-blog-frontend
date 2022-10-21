import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login(props) {

  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });

  const [errorMessage, setErrorMessage] = useState({
    message: ''
  });

  function handleChange(e) {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  async function sendRequest() {
    const res = await axios.post("http://localhost:3300/api/user/login", {
      email: inputs.email,
      password: inputs.password,
    }).catch(err => {
      setErrorMessage(err.response.data);
    });

    let data = null;
    if (res) {
      data = await res.data;
    }

    return data;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const data = await sendRequest();
    (data) && (data.user) && props.setIsLoggedIn(true);
    (data) && (data.user) && sessionStorage.setItem("userID", data.user._id);
    (data) && (data.user) && navigate("/");
  }

  return (
    <div>
      {/* Page Header*/}
      <header className="masthead" style={{ "backgroundImage": "url('assets/img/contact-bg.jpg')" }}>
        <div className="container position-relative px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <div className="page-heading">
                <h1>Login Old User</h1>
                <span className="subheading">Login Old User</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Main Content*/}
      <main className="mb-4">
        <div className="container px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">

              <div className="my-5">
                <form action="/user/authenticate" method="POST" onSubmit={handleSubmit}>
                  <div className="form-floating">
                    <input className="form-control" onChange={handleChange} id="email" name="email" type="email"
                      placeholder="Type your registed email..." required />
                    <label htmlFor="email">Email</label>
                  </div>
                  <div className="form-floating">
                    <input className="form-control" onChange={handleChange} id="password" name="password" type="password"
                      placeholder="Type the password..." required />
                    <label htmlFor="password">Password</label>
                  </div>
                  {/* Submit Button*/}
                  <button className="btn btn-primary text-uppercase" id="submitButton" type="submit">Login</button>
                  {
                    (errorMessage.message) &&
                    <span style={{ 'color': '#dc3545', 'fontWeight': 'bold', 'fontStyle': 'oblique' }}>
                      &ensp; &ensp; {errorMessage.message}
                    </span>
                  }
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Login