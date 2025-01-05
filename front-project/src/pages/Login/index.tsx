import React, { useState } from 'react';
import './index.scss';
import { register, login } from '../../api/users';
import { RegisterData, LoginData } from '../../interfaces/registerData';

const Login: React.FC = () => {
    
    const [isRegisterActive, setIsRegisterActive] = useState(false);

    const handleSwitch = () => {
        setIsRegisterActive(!isRegisterActive);
    };

    // State for register
    const [registerEmail, setRegisterEmail] = useState<string>('');
    const [registerPassword, setRegisterPassword] = useState<string>('');
    const [registerPassword2, setRegisterPassword2] = useState<string>('');

    // Register handler
    const handleRegister = async (e: React.FormEvent) => {
        if (registerPassword !== registerPassword2) {
            alert('Passwords do not match');
            return;
        }
        e.preventDefault();
        const registerData: RegisterData = { email: registerEmail, password: registerPassword };
        try {
            const response = await register(registerData);
            console.log('Registration successful:', response);
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    // State for login
    const [loginEmail, setLoginEmail] = useState<string>('');
    const [loginPassword, setLoginPassword] = useState<string>('');

    // Login handler
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const loginData: LoginData = { email: loginEmail, password: loginPassword };
        try {
            const response = await login(loginData);
            console.log('Login successful:', response);
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div className='this-body'>
            <div
                className={`content justify-content-center align-items-center d-flex shadow-lg ${
                    isRegisterActive ? 'active' : ''
                }`}
                id='content'
            >
                <div className='col-md-6 d-flex justify-content-center'>
                    <form onSubmit={handleRegister}>
                        <div className='header-text mb-4'>
                            <h1>Create an account</h1>
                        </div>
                        <div className='input-group mb-3'>
                            <input 
                                type='email' 
                                placeholder='mateo@gmail.com' 
                                className='form-control form-control-lg bg-lignt fs-6' 
                                id='email' 
                                value={registerEmail}
                                onChange={(e) => setRegisterEmail(e.target.value)}
                                required    
                            />
                        </div>
                        <div className='input-group mb-3'>
                            <input 
                                type='password' 
                                placeholder='password' 
                                className='form-control form-control-lg bg-lignt fs-6' 
                                id='password' 
                                value={registerPassword}
                                onChange={(e) => setRegisterPassword(e.target.value)}
                                required    
                            />
                        </div>

                        <div className='input-group mb-3'>
                            <input 
                                type='password' 
                                placeholder='repeat password' 
                                className='form-control form-control-lg bg-lignt fs-6' 
                                id='password' 
                                value={registerPassword2}
                                onChange={(e) => setRegisterPassword2(e.target.value)}
                                required    
                            />
                        </div>

                        <div className='input-group mb-3 justify-content-center'>
                            <button className='btn border-white text-white w-50 fs-6'>Register</button>
                        </div>
                    </form>
                </div>

                <div className='col-md-6 right-box'>
                    <form onSubmit={handleLogin}>
                        <div className='header-text mb-4'>
                            <h1>Sign In</h1>
                        </div>
                        <div className='input-group mb-3'>
                            <input 
                                type='text' 
                                placeholder='mateo@gmail.com' 
                                className='form-control form-control-lg bg-lignt fs-6' 
                                id='email' 
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                                required    
                            />
                        </div>
                        <div className='input-group mb-3'>
                            <input 
                                type='password' 
                                placeholder='password' 
                                className='form-control form-control-lg bg-lignt fs-6' 
                                id='password' 
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                                required    
                            />
                        </div>
                        <div className='input-group mb-3 justify-content-center'>
                            <button type='submit' className='btn border-white text-white w-50 fs-6'>Login</button>
                        </div>
                    </form>
                </div>

                <div className='switch-content'>
                    <div className='switch'>
                        <div className='switch-panel switch-left'>
                            <h1>Hello, Again</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button
                                className='hidden btn border-white text-white w-50 fs-6'
                                id='login'
                                onClick={handleSwitch}
                            >
                                Login
                            </button>
                        </div>

                        <div className='switch-panel switch-right'>
                            <h1>Welcome</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button
                                className='hidden btn border-white text-white w-50 fs-6'
                                id='register'
                                onClick={handleSwitch}
                            >
                                Register
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;