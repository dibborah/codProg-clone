import axios from "axios"
import { BASE_URL, SUPABASE_API_KEY } from "../constants"
import { getUser } from "./getUser"

const refreshToken = async () => {
    const user = await getUser();
    const endpoint = BASE_URL + "auth/v1/token?grant_type=refresh_token"
    const { data } = await axios.post(endpoint, { refresh_token: user.refresh_token }, {
        headers: {
            apiKey: SUPABASE_API_KEY,
            "Content-Type": "application/json"
        }
    })
    const { access_token, expires_at, refresh_token } = data;
    // console.log("access_token from refreshToken fc", access_token);
    localStorage.setItem('user', JSON.stringify({ access_token, expires_at, refresh_token }));
    return access_token;
}

export default refreshToken