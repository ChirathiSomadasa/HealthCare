import { useEffect, useState } from 'react';
import React from 'react';
import { Form, Input, DatePicker, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import './SignUp.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Radio } from 'antd';


function SignUp() {
  const [bloodGroup, setBloodGroup] = useState(''); // State to hold the blood group input

  // Predefined list of blood groups
  const bloodGroupsList = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleBloodGroupChange = (e) => {
    setBloodGroup(e.target.value); // Update state as user types
  };
  var navigate = useNavigate();

  const onFinishSignIn = (values) => {
    axios
      .post('http://localhost:5002/user/register', values)
      .then(function (response) {
        var data = response.data;
        var status = data.status;
        if (status === 'success') {
          navigate('/login');
        } else {
          alert(JSON.stringify(data));
        }
      })
      .catch(function (error) {
        alert(error);
      });
  };



  const validatePhoneNumber = (rule, value, callback) => {
    const phoneNumberPattern = /^\d{10}$/; // Regular expression for 10-digit phone number
    if (!phoneNumberPattern.test(value)) {
      callback('Please enter a valid 10-digit phone number');
    } else {
      callback();
    }
  };

  const validateEmail = (rule, value, callback) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email address
    if (!emailPattern.test(value)) {
      callback('Please enter a valid email address');
    } else {
      callback();
    }
  };

  const validatePassword = (rule, value, callback) => {
    if (value && value.length < 4) {
      callback('Password must be at least 4 characters');
    } else {
      callback();
    }
  };



  return (
    <div className="bg-image">
      <div className="authentication">
        <div className="authentication-form card p-2">
          <h1 className="card-title">CREATE AN ACCOUNT</h1>
          <Form layout="vertical" onFinish={onFinishSignIn}>
            <Form.Item
              label="Full Name"
              name="full_name"
              rules={[
                {
                  required: true,
                  message: 'Please input your Full Name!',
                },
              ]}
            >
              <Input className="signup_input" placeholder="Full Name" />
            </Form.Item>


            <Form.Item
              label="Address"
              name="address"
              rules={[
                {
                  required: true,
                  message: 'Please input your Address!',
                },
              ]}
            >
              <Input className="signup_input" placeholder="Address" />
            </Form.Item>


            <Form.Item
              label="Contact Number"
              name="mobile_number"
              rules={[
                {
                  required: true,
                  message: 'Please input your Contact Number!',
                },
                {
                  validator: validatePhoneNumber,
                },
              ]}
            >
              <Input className="signup_input" placeholder="Contact Number" />
            </Form.Item>


            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your Email!',
                },
                {
                  validator: validateEmail,
                },
              ]}
            >
              <Input className="signup_input" placeholder="Email" />
            </Form.Item>


            <Form.Item
              label="Date of Birth"
              name="birthdate"
              rules={[
                {
                  required: true,
                  message: 'Please input!',
                },
              ]}
            >
              <DatePicker className='date' />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
                {
                  validator: validatePassword,
                },
              ]}
            >
              <Input.Password className="signup_input" placeholder="Password" type="password" />
            </Form.Item>

            <Checkbox value="physicalCard">Do you request Physical Health Card?</Checkbox>

            <button className="primary-button" type="submit" >SIGN UP</button>
            <p className="para">
              Already have an account?<Link to="/login" className="anchor">LOGIN</Link>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
