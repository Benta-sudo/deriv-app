# Deriv OAuth Implementation

This document describes the OAuth implementation for the Deriv API with app ID `72216` and redirect URL `https://osamhnr.com/oauth/callback`.

## Configuration

### App Configuration

- **App ID**: 72216
- **Redirect URL**: https://osamhnr.com/oauth/callback
- **OAuth URL**: https://oauth.deriv.com/oauth2/authorize
- **Token URL**: https://oauth.deriv.com/oauth2/token
- **Scopes**: read,write,trade,payments,admin

### Files Modified/Created

1. **`src/config/deriv-api.js`** - Main configuration file with OAuth settings
2. **`src/pages/login/login.jsx`** - Login page that initiates OAuth flow
3. **`src/pages/oauth/callback.jsx`** - OAuth callback handler
4. **`src/pages/dashboard/dashboard.jsx`** - Dashboard component after successful authentication
5. **`src/services/deriv-api-service.js`** - API service for WebSocket communication
6. **`src/app/app.jsx`** - Main app routing
7. **`packages/shared/src/utils/config/config.ts`** - Updated to include app ID 72216

## OAuth Flow

### 1. Login Initiation

When a user visits the login page (`/login`), they see a "Connect with Deriv" button. Clicking this button:

1. Constructs the OAuth URL with required parameters
2. Redirects the user to Deriv's OAuth authorization page

```javascript
const oauthUrl = new URL(DERIV_API_CONFIG.oauth_url);
oauthUrl.searchParams.append('app_id', DERIV_API_CONFIG.app_id);
oauthUrl.searchParams.append('l', 'EN');
oauthUrl.searchParams.append('brand', 'deriv');
oauthUrl.searchParams.append('redirect_uri', DERIV_API_CONFIG.redirect_url);
oauthUrl.searchParams.append('response_type', 'code');
oauthUrl.searchParams.append('scope', DERIV_API_CONFIG.scope);
```

### 2. OAuth Authorization

The user is redirected to Deriv's OAuth page where they:

- Log in to their Deriv account
- Grant permissions to the application
- Are redirected back to the callback URL with an authorization code

### 3. Token Exchange

The callback handler (`/oauth/callback`) receives the authorization code and:

1. Exchanges the code for an access token via POST request to the token URL
2. Authorizes the WebSocket connection with the access token
3. Stores the token in localStorage
4. Redirects to the dashboard

```javascript
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
```

### 4. Dashboard Access

After successful authentication, users are redirected to the dashboard where they can:

- View their account information
- See their account balance
- Access trading features
- Logout when needed

## WebSocket Connection

The application uses the Deriv API WebSocket connection for real-time data:

```javascript
// Connection URL format
wss://ws.binaryws.com/websockets/v3?app_id=72216&l=EN&brand=deriv
```

## Security Features

1. **Token Storage**: Access tokens are stored in localStorage
2. **Automatic Authorization**: WebSocket connection is automatically authorized with the access token
3. **Logout Functionality**: Users can logout, which clears tokens and disconnects the WebSocket
4. **Error Handling**: Comprehensive error handling for OAuth failures

## Testing

A test HTML file is provided at `public/test-oauth.html` that can be used to test the OAuth flow independently.

### To test the OAuth flow:

1. Open `public/test-oauth.html` in a browser
2. Click "Test OAuth Login"
3. Complete the OAuth flow on Deriv's website
4. Verify the callback receives the authorization code

## API Endpoints Available

After successful authentication, the following API endpoints are available:

- `authorize` - Authorize the connection
- `balance` - Get account balance
- `buy` - Buy contracts
- `sell` - Sell contracts
- `statement` - Get account statement
- `cashier` - Access cashier functions
- `portfolio` - Get portfolio information
- `proposal` - Get trading proposals
- `ticks_history` - Get historical price data
- And many more...

## Troubleshooting

### Common Issues

1. **Invalid redirect URI**: Ensure the redirect URL exactly matches what's registered with Deriv
2. **Invalid app ID**: Verify app ID 72216 is correctly configured
3. **CORS issues**: Ensure the domain is properly configured for OAuth
4. **Token expiration**: Implement refresh token logic for long-term access

### Debug Steps

1. Check browser console for errors
2. Verify OAuth URL parameters
3. Check network requests in browser dev tools
4. Verify token exchange response

## Dependencies

- `@deriv/deriv-api` - Official Deriv API library
- `react-router-dom` - For routing
- React hooks for state management

## Environment Setup

Make sure the following environment variables are set (if needed):

- `REACT_APP_DERIV_APP_ID=72216`
- `REACT_APP_DERIV_REDIRECT_URL=https://osamhnr.com/oauth/callback`

## Production Deployment

For production deployment:

1. Ensure the domain `osamhnr.com` is properly configured
2. Set up HTTPS for secure OAuth communication
3. Configure proper CORS headers
4. Implement proper error logging
5. Set up monitoring for OAuth failures

## Support

For issues related to:

- OAuth configuration: Check Deriv's OAuth documentation
- WebSocket connection: Refer to Deriv API documentation
- Application-specific issues: Check the application logs
