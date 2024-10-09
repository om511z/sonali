import React, { useEffect, useState } from 'react';
import { Button, Form, Modal, message, Input, Table } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import axios from 'axios';
import './Main.css';
import Navbar from '../components/Navbar'
const Home = () => {
  const [blogData, setBlogData] = useState([])

  const [addModal, setAddModal] = useState(false)

  const [editData,setEditData] = useState(null)

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

  // Create blog

  const createBlog = (values) => {
    if (editData === null) {
        axios
            .post('https://blogbackend-huin.onrender.com/api/blogs/createblogs', values)
            .then((res) => {
                message.success('Blog Added Successfully');
                getBlog();
                setAddModal(false);
            })
            .catch((error) => {
                console.log(error);
                message.error('Something Went Wrong');
            });
    } else {
        axios
            .put(`https://blogbackend-huin.onrender.com/api/blogs/editblogs/${editData._id}`, values) 
            .then((res) => {
                message.success('Blog Edited Successfully');
                getBlog();
                setEditData(null);
                setAddModal(false);
            })
            .catch((error) => {
                console.log(error);
                message.error('Something Went Wrong');
            });
    }
};


  // Delete blog
  const deleteBlog = (record) => {
    axios
      .delete(`https://blogbackend-huin.onrender.com/api/blogs/deleteblogs/${record._id}`)
      .then((res) => {
        message.success('Blog Deleted Successfully');
        getBlog();
      })
      .catch((error) => {
        console.log(error);
        message.error('Something Went Wrong');
      });
  };

  const columns = [
    {
      title: 'Blog Title',
      dataIndex: 'title',
    },
    {
      title: 'Blog Image',
      dataIndex: 'image',
      render: (image) => <img src={image} alt='' height='60' width='60' />,
    },
    {
      title: 'Blog Description',
      dataIndex: 'description',
      render: (text) => (text.length > 150 ? `${text.substring(0, 150)}...` : text),
    },
    {
      title: 'Actions',
      dataIndex: '_id',
      render: (id, record) => (
        <div className='d-flex'>
          <DeleteOutlined className='mx-2' onClick={() => deleteBlog(record)} />
          <EditOutlined className='mx-2' onClick={()=>{
            setEditData(record)
            setAddModal(true)
          }}/>
        </div>
      ),
    },
  ];

  return (
    <>
    <Navbar/>
      <div className=' mx-4' style={{ display: 'flex', justifyContent: 'flex-end' ,marginTop:'50px'}}>
        <Button type='primary' onClick={() => setAddModal(true)}>
          Add Blog
        </Button>
      </div>

      <div className='table-container '>
        <Table columns={columns} dataSource={blogData} bordered></Table>
      </div>

      {addModal && (
        <Modal title={'BLOGGING SITE'} open={addModal} footer={null} onCancel={() => {
          setAddModal(false)
          setEditData(null)
        }}>
          <Form initialValues={editData} layout='vertical' onFinish={createBlog}>
            <Form.Item name='title' label='Title'>
              <Input />
            </Form.Item>

            <Form.Item name='image' label='Image'>
              <Input />
            </Form.Item>

            <Form.Item name='description' label='Description'>
              <Input.TextArea rows={10} />
            </Form.Item>

            <div className='d-flex justify-content-end'>
              <Button htmlType='submit' type='primary'>
                Add
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </>
  );
};

export default Home;
