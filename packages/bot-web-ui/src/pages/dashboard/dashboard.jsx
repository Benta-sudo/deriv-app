import React, { useEffect, useState } from 'react';
import { derivApiService } from '../../services/deriv-api-service';
import './dashboard.scss';

const Dashboard = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [balance, setBalance] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);

                // Get user balance
                const balanceResponse = await derivApiService.getBalance();
                if (balanceResponse.error) {
                    throw new Error(balanceResponse.error.message);
                }
                setBalance(balanceResponse.balance);

                // Get user info from the token
                const token = localStorage.getItem('deriv_token');
                if (token) {
                    // Decode the token to get user info (JWT tokens can be decoded)
                    try {
                        const payload = JSON.parse(atob(token.split('.')[1]));
                        setUserInfo({
                            loginid: payload.loginid,
                            currency: payload.currency,
                            name: payload.name || 'User',
                        });
                    } catch (e) {
                        console.warn('Could not decode token payload');
                    }
                }

                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch user data:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('deriv_token');
        localStorage.removeItem('deriv_refresh_token');
        derivApiService.disconnect();
        window.location.href = '/login';
    };

    if (loading) {
        return (
            <div className='dashboard-container'>
                <h2>Loading Dashboard...</h2>
                <p>Please wait while we load your account information.</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className='dashboard-container'>
                <h2>Error Loading Dashboard</h2>
                <p>{error}</p>
                <button onClick={handleLogout}>Logout</button>
            </div>
        );
    }

    return (
        <div className='dashboard-container'>
            <div className='dashboard-header'>
                <h1>Welcome to Deriv Bot Dashboard</h1>
                <button onClick={handleLogout} className='logout-button'>
                    Logout
                </button>
            </div>

            <div className='dashboard-content'>
                <div className='user-info-card'>
                    <h3>Account Information</h3>
                    {userInfo && (
                        <div className='user-details'>
                            <p>
                                <strong>Login ID:</strong> {userInfo.loginid}
                            </p>
                            <p>
                                <strong>Name:</strong> {userInfo.name}
                            </p>
                            <p>
                                <strong>Currency:</strong> {userInfo.currency}
                            </p>
                        </div>
                    )}
                </div>

                <div className='balance-card'>
                    <h3>Account Balance</h3>
                    {balance && (
                        <div className='balance-details'>
                            <p>
                                <strong>Available Balance:</strong> {balance.balance} {balance.currency}
                            </p>
                        </div>
                    )}
                </div>

                <div className='features-card'>
                    <h3>Available Features</h3>
                    <ul>
                        <li>View account balance and transactions</li>
                        <li>Access trading tools</li>
                        <li>Manage your portfolio</li>
                        <li>Configure trading strategies</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
