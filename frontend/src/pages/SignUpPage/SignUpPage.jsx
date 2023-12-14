import React, {useState} from 'react';
import {Form, Input, DatePicker, Upload, Button, message} from 'antd';
import {UserOutlined, InboxOutlined} from '@ant-design/icons';
import {useForm} from 'react-hook-form';

const {Dragger} = Upload;

const Signup = () => {
    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    const [formData, setFormData] = useState({
        email: '',
        fullName: '',
        dateOfBirth: null,
        profilePicture: '',
        password: '',
        cPassword: '',
    });

    const onSubmit = async () => {
        const requiredFields = ['email', 'fullName', 'dateOfBirth', 'password', 'cPassword'];
        const hasEmptyField = requiredFields.some(field => !formData[field]);

        if (hasEmptyField) {
            message.error('Please fill in all required fields');
            return;
        }
        if (formData.password !== formData.cPassword) {
            message.error('Passwords do not match');
            return;
        }
        else {
            console.log('Email:', formData.email);
            console.log('Full Name:', formData.fullName);
            console.log('Password:', formData.password);
            console.log('Confirmed Password:', formData.cPassword);
            message.success('Signup successful!');

            await new Promise(resolve => setTimeout(resolve, 3000));
            window.location.href = 'http://localhost:3000';
        }
    };

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    const handleInputChange = (name, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div style={{maxWidth: '500px', margin: 'auto'}}>
            <h2 style={{marginBottom: '1rem', textAlign: 'center', margin: 20, marginTop: 20}}>Sign Up</h2>
            <Form onFinish={handleSubmit(onSubmit)}>
                <Form.Item
                    name="email"
                    rules={[{required: true, message: 'Please input your email!'}]}
                >
                    <Input
                        prefix={<UserOutlined/>}
                        placeholder="Email"
                        {...register('email')}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                </Form.Item>
                <Form.Item
                    name="fullName"
                    rules={[{required: true, message: 'Please input your full name!'}]}
                >
                    <Input
                        prefix={<UserOutlined/>}
                        placeholder="Full Name"
                        {...register('fullName')}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                    />
                </Form.Item>
                <Form.Item
                    name="dateOfBirth"
                    rules={[{required: true, message: 'Please select your date of birth!'}]}
                >
                    <DatePicker
                        placeholder="Date of Birth"
                        style={{width: '100%'}}
                        {...register('dateOfBirth')}
                        onChange={(date) => handleInputChange('dateOfBirth', date)}
                    />
                </Form.Item>
                <Form.Item
                    name="profilePicture"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    rules={[{required: false, message: 'Please upload your profile picture!'}]}
                >
                    <Dragger name="file" multiple={false} beforeUpload={() => false}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined/>
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    </Dragger>
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                    hasFeedback
                >
                    <Input.Password
                        prefix={<UserOutlined />}
                        placeholder="Password"
                        {...register('password')}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                    />
                </Form.Item>
                <Form.Item
                    name="cPassword"
                    rules={[
                        { required: true, message: 'Please confirm your password!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Passwords do not match'));
                            },
                        }),
                    ]}
                    hasFeedback
                >
                    <Input.Password
                        prefix={<UserOutlined />}
                        placeholder="Confirm Password"
                        {...register('cPassword')}
                        onChange={(e) => handleInputChange('cPassword', e.target.value)}
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{width: '100%'}}
                            onClick={onSubmit}>
                        Sign Up
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Signup;
