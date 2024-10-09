import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import './Main.css';
const Details = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`https://blogbackend-huin.onrender.com/api/blogs/getblogs/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error(error);
        
        setBlog(null); 
      }
    };

    fetchBlog();

    
    // };
  }, [id]);

 
  if (!blog) return <div>Loading...</div>;

  return (
    <>
    <Navbar/>
    <div className='details' >
      <h1 className='details-title' >{blog.title}</h1>
      <img src={blog.image} alt={blog.title} />
      <p className='details-para'>{blog.description}</p>
    </div>
    </>
  );
};

export default Details;
