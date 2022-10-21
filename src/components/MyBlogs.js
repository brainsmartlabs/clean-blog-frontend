import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogPreview from './BlogPreview';
import { Link } from 'react-router-dom';

async function sendRequest(id) {
  //console.log(`ID of the user: ${id}`);
  const res = await axios.get(`http://localhost:3300/api/blog/user/${id}`)
    .catch(err => console.log(err));
  const data = await res.data;
  return data;
}

function MyBlogs() {

  const [user, setUser] = useState({});

  useEffect(() => {
    const id = sessionStorage.getItem('userID');
    sendRequest(id).then(data => {
      setUser(data.user);
    });
  }, []);

  return (
    <div>
      {/* Page Header*/}
      <header className="masthead" style={{ "backgroundImage": "url('assets/img/about-bg.jpg')" }}>
        <div className="container position-relative px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <div className="site-heading">
                <h1>Blogs of {user.name}</h1>
                <span className="subheading">View my blogs below</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Main Content*/}
      <div className="container px-4 px-lg-5">
        <div className="row gx-4 gx-lg-5 justify-content-center">
          <div className="col-md-10 col-lg-8 col-xl-7">

            {(user.blogs) && user.blogs.map((blog, index) => {
              return (<BlogPreview
                key={index}
                blogID = {blog._id}
                title={blog.title}
                description={blog.description}
                datePosted={new Date(blog.datePosted).toDateString()}
                user={user}
              />);
            })}

            {/* Pager*/}
            <div className="d-flex justify-content-end mb-4"><Link className="btn btn-primary text-uppercase"
              to="/">Older Posts →</Link></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyBlogs