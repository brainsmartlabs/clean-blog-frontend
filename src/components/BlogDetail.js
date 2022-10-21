import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

function BlogDetail() {
  const [blog, setBlog] = useState(null);
  const blogID = useParams().id;

  async function fetchDetails() {
    const res = await axios.get(`http://localhost:3300/api/blog/${blogID}`)
      .catch(err => console.log(err));
    const data = await res.data;
    return data;
  }

  useEffect(() => {
    fetchDetails().then(data => {
      setBlog(data.blog);
    });
  }, []);

  return ((blog) ?
    (<div>
      {/* Page Header*/}
      <header className="masthead" style={{ "backgroundImage": "url('assets/img/post-bg.jpg')" }} >
        <div className="container position-relative px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <div className="post-heading">
                <h1>{blog.title}</h1>
                <h2 className="subheading">{blog.description}</h2>
                <span className="meta">
                  Posted by <Link to={`/otherBlogs/${blog.user._id}`}
                    style={{ 'color': '#0dcaf0' }}>{blog.user.name}</Link>
                  &nbsp; on &ensp; {new Date(blog.datePosted).toDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Post Content*/}
      <article className="mb-4">
        <div className="container px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <p> {blog.description}</p>
            </div>
          </div>
        </div>
      </article>
    </div>) : (<h1>Loading</h1>)
  )
}

export default BlogDetail