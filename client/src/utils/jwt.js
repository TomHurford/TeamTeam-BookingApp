// import jwt from 'jsonwebtoken';

const axios = require('axios');
const sessionStorage = require('sessionstorage');

// export const decodeToken = (token) => {
//     return jwt.decode(token);
// }

export const getToken = () => {
    return sessionStorage.getItem('token');
}

export const setToken = (token) => {
    console.log('SET TOKEN FUNC')
    sessionStorage.setItem('token', token);
}

export const removeToken = () => {
    sessionStorage.removeItem('token');
}


// export const isTokenExpired = (token) => {
//     const decoded = decodeToken(token);
//     if (!decoded) return true;
//     return decoded.exp < Date.now() / 1000;
// }

export const checkIsLoggedIn = async () => {
    const token = getToken();

    if (token == null || token == 'null' || token == undefined) {
        return false;
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }      

    const res = await axios.post('https://localhost:5001/user/checkUserLoggedIn', {}, {
        headers: headers
      }).catch(err => {
        console.log(err);
      })
    if (res !== undefined && res.status == 200) {
        return true;
    } else {
        removeToken()
    }
    return false;

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
    axios.post('https://localhost:5001/user/checkUserLoggedIn', { token: getToken() })
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