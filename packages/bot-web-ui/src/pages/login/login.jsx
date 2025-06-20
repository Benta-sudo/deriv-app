import React from 'react';
import { DERIV_API_CONFIG } from '../../config/deriv-api';
import './login.scss';

const Login = () => {
    const handleLogin = () => {
        const oauthUrl = new URL(DERIV_API_CONFIG.oauth_url);
        oauthUrl.searchParams.append('app_id', DERIV_API_CONFIG.app_id);
        oauthUrl.searchParams.append('l', 'EN');
        oauthUrl.searchParams.append('brand', 'deriv');
        oauthUrl.searchParams.append('redirect_uri', DERIV_API_CONFIG.redirect_url);
        oauthUrl.searchParams.append('response_type', 'code');
        oauthUrl.searchParams.append('scope', DERIV_API_CONFIG.scope);

        window.location.href = oauthUrl.toString();
    };

    return (
        <div className='login-container'>
            <h1>Welcome to Deriv Bot</h1>
            <p>Connect your Deriv account to start trading</p>
            <button className='login-button' onClick={handleLogin}>
                Connect with Deriv
            </button>
        </div>
    );
};

export default Login;
