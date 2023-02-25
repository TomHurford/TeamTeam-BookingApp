// import jwt from 'jsonwebtoken';
import axios from 'axios';

// export const decodeToken = (token) => {
//     return jwt.decode(token);
// }

export const getToken = () => {
    return localStorage.getItem('token');
}

export const setToken = (token) => {
    localStorage.setItem('token', token);
}

export const removeToken = () => {
    localStorage.removeItem('token');
}

// export const isTokenExpired = (token) => {
//     const decoded = decodeToken(token);
//     if (!decoded) return true;
//     return decoded.exp < Date.now() / 1000;
// }

export const isLoggedIn = () => {
    const token = getToken();

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }      

    axios.post('https://localhost:5001/user/verify', {}, {
        headers: headers
      })
        .then(() => {
            return true;
        })
        .catch(error => {
            // Redirect to login page if the token is invalid
            removeToken();
            console.log(error.message);
            return false;
        });

}

// export const requireAuth = (nextState, replace) => {
//     if (!isLoggedIn()) {
//         replace({
//             pathname: '/login',
//             state: { nextPathname: nextState.location.pathname }
//         });
//     }
// }

// Send a request to the server to refresh the token, 
export const refreshAuthToken = () => {
    axios.post('https://localhost:5001/user/verify', { token: getToken() })
        .then(response => {
            setToken(response.data.token);
        })
        .catch(error => {
            // Redirect to login page if the token is invalid
            removeToken();
            window.location.href = '/login';
            console.log(error.message);
        });
}
