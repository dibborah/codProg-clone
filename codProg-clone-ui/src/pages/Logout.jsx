import axios from "axios";
import { redirect } from "react-router-dom";
import { LOGOUT_URL, SUPABASE_API_KEY } from "../constants";
import { getUser } from "../utils/getUser";

export async function logoutAction () {
    try{
        const user = await getUser();
        await axios.post(LOGOUT_URL, null, {
            headers: {
                "apikey": SUPABASE_API_KEY,
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.access_token}`
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