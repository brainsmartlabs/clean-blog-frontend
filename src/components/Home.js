import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogPreview from './BlogPreview';
import { Link } from 'react-router-dom';


function Home() {

    const [blogs, setblogs] = useState([]);
    async function sendRequest() {
        const res = await axios.get("http://localhost:3300/api/blog/")
            .catch(err => console.log(err));
        const data = await res.data;
        return data;
    }

    useEffect(() => {
        sendRequest().then(data => {
            setblogs(data.blogs);
        });
    }, []);

    return (
        <div>
            {/* Page Header*/}
            <header className="masthead" style={{ "backgroundImage": "url('assets/img/home-bg.jpg')" }}>
                <div className="container position-relative px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-md-10 col-lg-8 col-xl-7">
                            <div className="site-heading">
                                <h1>Bajji Blogs</h1>
                                <span className="subheading">Create Blogs on your Liking</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {/* Main Content*/}
            <div className="container px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-md-10 col-lg-8 col-xl-7">
                        {(blogs.length > 0) && blogs.map((blog, index) => {
                            return (<BlogPreview
                                key={index}
                                blogID={blog._id}
                                title={blog.title}
                                description={blog.description}
                                datePosted={new Date(blog.datePosted).toDateString()}
                                user={blog.user}
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

export default Home;