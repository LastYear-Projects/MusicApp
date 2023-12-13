import React from 'react';
import { Form, Input, DatePicker, Upload, Button, message } from 'antd';
import { UserOutlined, CalendarOutlined, InboxOutlined } from '@ant-design/icons';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import {Title} from "@mui/icons-material";

const { Dragger } = Upload;

const Signup = () => {
  const { register, handleSubmit, setValue, watch, setError } = useForm();

  const onSubmit = async (data) => {
    try {
      // TODO: Send the signup data to your server using axios
      console.log(data);
      // Example:
      // const response = await axios.post('/api/signup', data);
      // Handle the response as needed
      message.success('Signup successful!');
    } catch (error) {
      console.error('Signup error:', error);
      message.error('Signup failed. Please try again.');
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
      <div style={{maxWidth: '500px', margin: 'auto'}}>
        <h2 style={{ marginBottom: '1rem' ,textAlign:'center', margin: 20, marginTop:20}}>Sign Up</h2>
      <Form onFinish={handleSubmit(onSubmit)}>
        <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Email" {...register('email')} />
        </Form.Item>
        <Form.Item
            name="fullName"
            rules={[{ required: true, message: 'Please input your full name!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Full Name" {...register('fullName')} />
        </Form.Item>
        <Form.Item
            name="dateOfBirth"
            rules={[{ required: true, message: 'Please select your date of birth!' }]}
        >
          <DatePicker
              placeholder="Date of Birth"
              style={{ width: '100%' }}
              onChange={(date) => setValue('dateOfBirth', date)}
          />
        </Form.Item>
        <Form.Item
            name="profilePicture"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ required: true, message: 'Please upload your profile picture!' }]}
        >
          <Dragger name="file" multiple={false} beforeUpload={() => false}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
          </Dragger>
        </Form.Item>
        <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password prefix={<UserOutlined />} placeholder="Password" {...register('password')} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Sign Up
          </Button>
        </Form.Item>
      </Form>
        </div>
  );
};

export default Signup;
