// import jwt from 'jsonwebtoken';

const axios = require('axios');
const sessionStorage = require('sessionstorage');



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




export const checkIsLoggedIn = async () => {
    const token = getToken();

    if (token == null || token == 'null' || token == undefined) {
        return false;
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }      

    const res = await axios.post(process.env.REACT_APP_API_URL + '/user/checkUserLoggedIn', {}, {
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
