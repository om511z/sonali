import { Col, Row } from 'antd';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar'
import './Main.css';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
const Main = () => {
  const [blogData, setBlogData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchKey, setSearchKey] = useState('');



  // Get blogs
  const getBlog = () => {
    axios
      .get('https://blogbackend-huin.onrender.com/api/blogs/getblogs')
      .then((res) => {
        setBlogData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getBlog();
  }, []);

  const filterData = () => {
    let filtered = blogData;

    if (searchKey) {
      filtered = filtered.filter(transaction =>
        transaction.title.toLowerCase().includes(searchKey.toLowerCase())
      );
    }



    setFilteredData(filtered);
  };

  useEffect(() => {
    filterData();
  }, [searchKey, blogData]);


  return (
    <>
      <Navbar />
      <Banner />


      <div className="d-flex mt-4 main">
        <div className="container mx-auto">
          <input type="text" placeholder='Search Here' value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            className='search' />
        </div>
      </div>

      <h1 style={{ textAlign: 'center', color: 'orangered', marginTop: '50px', textTransform: 'uppercase', fontWeight: 'bold' }}>our blogs</h1>
      
      <div className='flex'>

        {filteredData.map((data) => (
          <div class="box">
            <img src={data.image} alt={data.title} />

            <div class="content">
              <h1>{data.title}</h1>
              <p> {data.description.slice(0, 110) + (data.description.length > 110 ? '...' : '')}</p>
              <Link to={`/blog/${data._id}`}><a className='read-btn'>Read More</a> </Link>
            </div>
          </div>
        ))}
      </div>

      <Footer />

    </>
  );
};

export default Main;
