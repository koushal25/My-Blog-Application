import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { AuthContext } from "../context/authContext";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const cat = useLocation().search; 
  
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  },[cat]);

  const getText = (html)=>{

    const doc = new DOMParser().parseFromString(html,"text/html")

    return doc.body.textContent.slice(0,250).concat(" .......");
  };

  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
              <img src={`../upload/${post.img}`} alt="" />
            </div>
            <div className="content">
        
              {currentUser ? <Link className="link" to={`/post/${post.id}`}>

              <h1>{post.title}</h1>
              </Link>:
              <Link className="link" to='/login'>

              <h1>{post.title}</h1>
              </Link>}

              <div className="mydiv">
                 <p>{getText(post.desc)}</p>
              </div>

              { currentUser ?<Link className="link" to={`/post/${post.id}`}>
             <button >Read More</button>
              </Link>:<Link className="link" to='/login'>
             <button >Read More</button>
              </Link>}
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
