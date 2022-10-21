import React from 'react'
import { Link } from 'react-router-dom';

function BlogPreview(props) {
    return (
        <div>
            {/*Post preview*/}
            <div className="post-preview">
                <Link to={`/blog/${props.blogID}`}>
                    <h2 className="post-title">{props.title}</h2>
                    <h3 className="post-subtitle">{props.description}</h3>
                </Link>
                
                <p className="post-meta">
                    Posted by <Link to={`/otherBlogs/${props.user._id}`}>{props.user.name}</Link>
                    &nbsp; on &ensp; {props.datePosted}
                </p>
            </div>
            {/* Divider*/}
            <hr className="my-4" />
        </div>
    )
}

export default BlogPreview;