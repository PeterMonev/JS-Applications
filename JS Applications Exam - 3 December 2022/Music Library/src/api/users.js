import { get, post } from './api.js';
import { setUserData, clearUserData } from '../util.js';

export async function login(email, password) {
    const {_id,email: resultEmail,accessToken} = await post('/users/login',{email, password});

    const userData = {
        _id,
        email: resultEmail,
        accessToken
    }

    setUserData(userData);

    return userData;
}

export async function register(email, password) {
    const {_id,email: resultEmail,accessToken} = await post('/users/register',{email, password});

    setUserData({   
        _id,
        email: resultEmail,
        accessToken
    });
}

export async function logout() {
    get('/users/logout');
    clearUserData();
}