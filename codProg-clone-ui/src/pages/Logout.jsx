import axios from "axios";
import { redirect } from "react-router-dom";
import { LOGOUT_URL, SUPABASE_API_KEY } from "../constants";
import { getUser } from "../utils/getUser";
import isTokenExpired from "../utils/isTokenExpired";
import refreshToken from "../utils/refreshToken";

export async function logoutAction () {
    let { access_token, expires_at } = await getUser();
    console.log('access_token from logout', access_token);
    if(isTokenExpired(expires_at)){
        console.log("Token expired")
        access_token = await refreshToken();
    }
    try{
        await axios.post(LOGOUT_URL, null, {
            headers: {
                "apikey": SUPABASE_API_KEY,
                "Content-Type": "application/json", 
                "Authorization": `Bearer ${access_token}`
            }
        });
    } catch (error) {
        console.error(error);
    } finally {
        localStorage.removeItem('user');
        // localStorage 'user remove
    }
    return redirect("/");
}

// rrd
// loader / action
// useEffect

// react is an unopinionated framework