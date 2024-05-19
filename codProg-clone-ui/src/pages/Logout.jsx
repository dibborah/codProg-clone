import { redirect } from "react-router-dom";

export async function logoutLoader () {
    console.log("logout loader");
    // api call => logout
    // localStorage 'user remove
    return redirect('/');
};