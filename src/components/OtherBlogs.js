import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogPreview from './BlogPreview';
import { useParams } from 'react-router-dom';

function OtherBlogs() {

  const [user, setUser] = useState({});
  const userID = useParams().id;

  async function sendRequest(id) {
    const res = await axios.get(`http://localhost:3300/api/blog/user/${id}`)
      .catch(err => console.log(err));
    const data = await res.data;
    return data;
  }

  useEffect(() => {
    sendRequest(userID).then(data => {
      setUser(data.user);
    });
  }, []);

  return ((user) ?
    (<div>
      <header className="masthead" style={{ "backgroundImage": "url('assets/img/about-bg.jpg')" }}>
        <div className="container position-relative px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <div className="site-heading">
                <h1>Blogs of {user.name}</h1>
                <span className="subheading">View blogs of {user.name} below</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container px-4 px-lg-5">
        <div className="row gx-4 gx-lg-5 justify-content-center">
          <div className="col-md-10 col-lg-8 col-xl-7">

            {(user.blogs) && user.blogs.map((blog, index) => {
              return (<BlogPreview
                key={index}
                title={blog.title}
                description={blog.description}
                datePosted={new Date(blog.datePosted).toDateString()}
                user={user}
              />);
            })}


            <div className="d-flex justify-content-end mb-4"><a className="btn btn-primary text-uppercase"
              href="#!">Older Posts →</a></div>
          </div>
        </div>
      </div>
    </div>) : (<h1> Loading..! </h1>)
  )
}

export default OtherBlogs;


