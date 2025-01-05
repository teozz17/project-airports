import React from 'react';
import './index.scss';

const ErrorPage: React.FC = () => {
    return (
        <div className="error-page">
            <h1 className="error-title">Oops!</h1>
            <p className="error-message">Something went wrong. Please try again later.</p>
        </div>
    );
};

export default ErrorPage;