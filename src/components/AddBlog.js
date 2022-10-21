import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddBlog(props) {

  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
  });

  function handleChange(e) {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const userID = sessionStorage.getItem('userID');
    if (!userID) console.log('Session value is Null, Nin Thika! First handle it');

    const res = await axios.post("http://localhost:3300/api/blog/add", {
      title: inputs.title,
      description: inputs.description,
      image: 'xxxxxx',
      user: userID
    }).catch(err => console.log(err));

    const data = await res.data;
    (data.blog) && navigate("/");
  }

  return (
    <div>
      {/* Page Header*/}
      <header className="masthead" style={{ "backgroundImage": "url('assets/img/about-bg.jpg')" }}>
        <div className="container position-relative px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <div className="page-heading">
                <h1>New Post</h1>
                <span className="subheading">Add New Post</span>
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
              {
                (props.isLoggedIn) ? (<div className="my-5">
                  <form onSubmit={handleSubmit} >
                    <div className="form-floating">
                      <input className="form-control" id="title" name="title" type="text"
                        placeholder="Enter the title..." onChange={handleChange} />
                      <label htmlFor="title">Title</label>
                    </div>

                    <div className="form-floating">
                      <textarea className="form-control" id="description" name="description" style={{ "height": "12rem" }}
                        placeholder="Enter your description here..." onChange={handleChange}></textarea>
                      <label htmlFor="description">Description</label>
                    </div>

                    {/* Submit Button*/}
                    <button id="submitButton" className="btn btn-primary text-uppercase" type="submit">Send</button>
                  </form>
                </div>) : (<h1>Sorry, Without Login you cannot Post the blog</h1>)
              }
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AddBlog