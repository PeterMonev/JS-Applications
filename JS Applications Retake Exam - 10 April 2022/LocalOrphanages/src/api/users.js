import { setUserData,clearUserData } from "../util.js";
import { get, post,del} from "./api.js";


export async function login(email,password) {
    const result = await post('/users/login',{email,password});

    const userData = {
        id: result._id,
        username: result.username,
        email: result.email,
        password: result.password,
        accessToken: result.accessToken,
    }

    setUserData(userData);

    return userData;
}

export async function register(email,password) {
    const result = await post('/users/register',{email,password});

    const userData = {
        id: result._id,
        email: result.email,
        password: result.password,
        accessToken: result.accessToken,
    }

    setUserData(userData);

    return userData;
}

export function logout (){
    get('/users/logout');
    clearUserData();
}