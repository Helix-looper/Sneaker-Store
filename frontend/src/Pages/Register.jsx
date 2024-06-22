import '../App.css';
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            toast.error("All fields are required!");
            return;
        }

        const registrationData = { name, email, password };

        try {
            await axios.post("http://localhost:5000/api/auth/register", registrationData);
            
            setName('');
            setEmail('');
            setPassword('');
            navigate('/login');
            toast.success("User registered successfully!");
        } catch (error) {
            console.error(error)
            toast.error("Failed to register user!");
        }
    }

    return (
        <div className='register-container'>
            <div className="form-box">
                <form className="form" id='form' onSubmit={submitHandler}>
                    <span className="title">Sign up</span>
                    <span className="subtitle">Create a free account with your email.</span>
                    <div className="form-container">
                        <input type="text" className="input" value={name} placeholder="Full Name" onChange={(e) => setName(e.target.value)} />
                        <input type="email" className="input" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" className="input" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type='submit'>Sign up</button>
                </form>
                <div className="form-section">
                    <p>Have an account? <Link to="/login">Log in</Link></p>
                </div>
            </div>
            <div className='register-sideImg'></div>
        </div>
    )
}


export default Register