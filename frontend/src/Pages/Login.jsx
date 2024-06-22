import '../App.css'
import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const submitHandler = async(e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("All fields are required!");
            return;
        }

        const loginData = {email, password};

        try {
            await axios.post("http://localhost:5000/api/auth/login", loginData);

            setEmail('');
            setPassword('');
            navigate('/home');
            toast.success("User registered successfully!");
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className='register-container'>
            <div className="form-box">
                <form className="form" onSubmit={submitHandler}>
                    <span className="title">Sign in</span>
                    <span className="subtitle">Sign in to your account.</span>
                    <div className="form-container">
                        <input type="email" className="input" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" className="input" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button>Sign in</button>
                </form>
                <div className="form-section">
                    <p>Don't have an account? <Link to="/register">Register</Link></p>
                </div>
            </div>
            <div className='register-sideImg'></div>
        </div>
    )
}

export default Login