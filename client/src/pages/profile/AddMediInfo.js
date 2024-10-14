import { useEffect, useState } from "react";
import React from "react";
import { Form, Input, Radio } from "antd";
import { Link } from "react-router-dom";
import "./AddMediInfo.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import AuthAPI from "../../api/AuthAPI";
import { errorMessage, successMessage } from "../../utils/Alert";

function AddMediInfo() {
    var navigate = useNavigate();
    const location = useLocation(); // Get the state from navigation
    const { userId,full_name} = location.state || {}; // Destructure the passed state
    const [recordDetails, setRecordDetails] = useState(null);

    const { mutate, isLoading } = useMutation({
         onSuccess: (res) => {
            successMessage("Success", res.data.message, () => {
             });
        },
        onError: (err) => {
            errorMessage("Error", err.response.data.message);
        },
    });

            
    

      // State variables for controlled inputs
  const [guradianname, setGuradianName] = useState("");
  const [guradianMNo, setGuradianMNo] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [bloodgroup, setBloodGroup] = useState("");
  const [heartrate, setHeartRate] = useState("");
  const [bloodpressure, setBloodPressure] = useState("");
  const [temperarture, setTemperature] = useState("");
  const [oxygensaturation, setOxygenSaturation] = useState("");
  const [respiratoryrate, setRespiratoryRate] = useState("");
  const [gender, setGender] = useState("");


    const handleSubmit =   (values) => {
        
        try {
            const response = axios.post("http://localhost:5002/AddProblem",
                 {  
                    userId: userId, // Add userId to the request
                    guardian_name: values.guardian_name,
                    guardian_Mno: values.guardian_Mno,
                    height: values.height,
                    weight: values.weight,
                    age: values.age,
                    blood_group: values.blood_group,
                    heart_rate: values.heart_rate,
                    blood_pressure: values.blood_pressure,
                    temperature: values.temperature,
                    oxygen_saturation: values.oxygen_saturation,
                    respiratory_rate: values.respiratory_rate,
                    gender: values.gender},
                    {
                        headers: {
                            'Content-Type': 'application/json', // Specify the content type if necessary
                            // Add any other headers you need here, e.g., Authorization: `Bearer ${token}`
                        },
                    });
             alert('Record added successfully!');
        
             setGuradianName('');
             setGuradianMNo('');
             setHeight('');
             setWeight('');
             setAge('');
             setBloodGroup('');
             setHeartRate('');
             setBloodPressure('');
             setTemperature('');
             setOxygenSaturation('');
             setRespiratoryRate('');
             setGender('');
             navigate('/Profile');
         } catch (err) {
             alert('Error adding problem. Please try again.');
        }
    };
    
  
 


    return (
        <div className="mediInfo-bg-image">
            <div className="mediInfo-authentication">
                <div className="mediInfo-authentication-form card p-2">
                    <h1 className="mediInfo-card-title">Add Information</h1>
                    <Form layout="vertical" onFinish={handleSubmit} initialValues={{ userId,full_name }}>
                    <Form.Item
                            label="Full Name"
                            name="userId"
                             
                        >
                            <Input className="mediInfo-signup_input"   />
                        </Form.Item>
                        <Form.Item
                            label="Full Name"
                            name="full_name"
                             
                        >
                            <Input className="mediInfo-signup_input"   />
                        </Form.Item>
                        
                        <Form.Item
                            label="Guardian Name"
                            name="guardian_name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Guardian_Name!",
                                },
                            ]}
                        >
                            <Input className="mediInfo-signup_input" placeholder="Guardian_Name" onChange={(e) => setGuradianName(e.target.value)}/>
                        </Form.Item>
                        <Form.Item
                            label="Guardian Contact No"
                            name="guardian_Mno"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Guardian_Contact_No!",
                                },
                            ]}
                        >
                            <Input className="mediInfo-signup_input" placeholder="Guardian_Contact_No" />
                        </Form.Item>
                        <Form.Item
                            label="Height"
                            name="height"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Height!",
                                },
                            ]}
                        >
                            <Input className="mediInfo-signup_input" placeholder="Height(Inches)" />
                        </Form.Item>

                        <Form.Item
                            label="Weight"
                            name="weight"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Weight!",
                                },
                            ]}
                        >
                            <Input className="mediInfo-signup_input" placeholder="Weight(Kg)" />
                        </Form.Item>
                        <Form.Item
                            label="Age"
                            name="age"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Age!",
                                },
                            ]}
                        >
                            <Input className="mediInfo-signup_input" placeholder="Age" />
                        </Form.Item>
                        <Form.Item
                            label="Blood group"
                            name="blood_group"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Blood_Group!",
                                },
                            ]}
                        >
                            <Input className="mediInfo-signup_input" placeholder="Blood_Group |A-|A+|B-|B+|AB-|AB+|O-|O+|" />
                        </Form.Item>


                        <Form.Item
                            label="Heart Rate"
                            name="heart_rate"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Heart_Rate!",
                                },
                            ]}
                        >
                            <Input className="mediInfo-signup_input" placeholder="Heart_Rate" />
                        </Form.Item>
                        <Form.Item
                            label="Blood Pressure"
                            name="blood_pressure"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Blood_Pressure!",
                                },
                            ]}
                        >
                            <Input className="mediInfo-signup_input" placeholder="Blood_Pressure" />
                        </Form.Item>
                        <Form.Item
                            label="Temperature"
                            name="temperature"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Temperature!",
                                },
                            ]}
                        >
                            <Input className="mediInfo-signup_input" placeholder="Temperature(Celsius)"/>
                        </Form.Item>
                        <Form.Item
                            label="Oxygen Saturation"
                            name="oxygen_saturation"
                             
                        >
                            <Input className="mediInfo-signup_input" placeholder="Oxygen_Saturation" />
                        </Form.Item>
                        <Form.Item
                            label="Respiratory Rate"
                            name="respiratory_rate"
                             
                        > 
                            <Input className="mediInfo-signup_input" placeholder="Respiratory_Rate" />
                        </Form.Item>


                        <Form.Item
                            label="Gender"
                            name="gender"
                            rules={[
                                {
                                    required: true,
                                    message: "Please select your gender!",
                                },
                            ]}
                        >
                            <Radio.Group>
                                <Radio value="male">Male</Radio>
                                <Radio value="female">Female</Radio>
                                <Radio value="other">Other</Radio>
                            </Radio.Group>
                        </Form.Item>




                        <button className="mediInfo-primary-button" type="submit">
                            SUBMIT
                        </button>

                    </Form>
                </div>
            </div>
        </div>
    );
}

export default AddMediInfo;
