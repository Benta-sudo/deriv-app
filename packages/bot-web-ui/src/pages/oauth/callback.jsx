import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { derivApiService } from '../../services/deriv-api-service';
import '../login/login.scss';

const OAuthCallback = () => {
    const [error, setError] = useState(null);
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        const handleCallback = async () => {
            try {
                // Get the authorization code from the URL
                const params = new URLSearchParams(location.search);
                const code = params.get('code');

                if (!code) {
                    throw new Error('No authorization code received');
                }

                // Exchange the code for an access token
                const response = await fetch('https://oauth.deriv.com/oauth2/token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({
                        grant_type: 'authorization_code',
                        code,
                        client_id: '72216',
                        redirect_uri: 'https://osamhnr.com/oauth/callback',
                    }),
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error_description || 'Failed to get access token');
                }

                // Authorize the API connection with the access token
                await derivApiService.authorize(data.access_token);

                // Store the token in localStorage or your preferred storage
                localStorage.setItem('deriv_token', data.access_token);
                localStorage.setItem('deriv_refresh_token', data.refresh_token);

                // Redirect to the main app
                history.push('/dashboard');
            } catch (err) {
                console.error('OAuth callback error:', err);
                setError(err.message);
            }
        };

        handleCallback();
    }, [history, location]);

    if (error) {
        return (
            <div className='error-container'>
                <h2>Authentication Error</h2>
                <p>{error}</p>
                <button onClick={() => history.push('/')}>Return to Home</button>
            </div>
        );
    }

    return (
        <div className='loading-container'>
            <h2>Completing Authentication...</h2>
            <p>Please wait while we complete the authentication process.</p>
        </div>
    );
};

export default OAuthCallback;
