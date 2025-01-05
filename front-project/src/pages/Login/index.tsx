import React, { useState } from 'react';
import './index.scss';

const Login: React.FC = () => {
    
    const [isRegisterActive, setIsRegisterActive] = useState(false);

    const handleSwitch = () => {
        setIsRegisterActive(!isRegisterActive);
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
                    <form>
                        <div className='header-text mb-4'>
                            <h1>Create an account</h1>
                        </div>
                        <div className='input-group mb-3'>
                            <input type='email' placeholder='mateo@gmail.com' className='form-control form-control-lg bg-lignt fs-6' id='email' />
                        </div>
                        <div className='input-group mb-3'>
                            <input type='password' placeholder='password' className='form-control form-control-lg bg-lignt fs-6' id='password' />
                        </div>

                        <div className='input-group mb-3'>
                            <input type='password' placeholder='repeat password' className='form-control form-control-lg bg-lignt fs-6' id='password' />
                        </div>

                        <div className='input-group mb-3 justify-content-center'>
                            <button className='btn border-white text-white w-50 fs-6'>Register</button>
                        </div>
                    </form>
                </div>

                <div className='col-md-6 right-box'>
                    <form>
                        <div className='header-text mb-4'>
                            <h1>Sign In</h1>
                        </div>
                        <div className='input-group mb-3'>
                            <input type='email' placeholder='mateo@gmail.com' className='form-control form-control-lg bg-lignt fs-6' id='email' />
                        </div>
                        <div className='input-group mb-3'>
                            <input type='password' placeholder='password' className='form-control form-control-lg bg-lignt fs-6' id='password' />
                        </div>
                        <div className='input-group mb-3 justify-content-center'>
                            <button className='btn border-white text-white w-50 fs-6'>Login</button>
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