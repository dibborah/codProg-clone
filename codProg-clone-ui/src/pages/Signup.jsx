import axios from "axios";
import { Form, redirect, useActionData } from "react-router-dom";
import { SIGNUP_URL, SUPABASE_API_KEY } from "../constants";
import { getUser } from "../utils/getUser";

export const signupLoader = async ({request}) => {
  // Need to test this redirection after signup
  const user = await getUser();
  if(user){
    return redirect('/');
  }
  return null;
}

export const signupAction = async ({ request }) => {
  const formData = await request.formData();
  const newUser = {
    email: formData.get("email"),
    password: formData.get("password")
  }
  console.log(newUser);
  const confirmPassword = formData.get("confirm-password");
  if(newUser.password !== confirmPassword){
    return {error: 'Password should match!!!'}
  }
  try {
    const response = await axios.post(SIGNUP_URL, newUser, {
      headers: {
        apiKey: SUPABASE_API_KEY,
        "Content-Type": "application/json"
      },
    });
    console.log(response)
    if(response?.identities && response.identities.length === 0){
      // havenot tested this error
      // test this first
      // signup with already signed up user email
      return {error: "This email already exist"};
    }
    // test this 2nd
    return {message: 'Please confirm your email and login'}
  } catch (error) {
    return {error: error.message};    
  }
};

const Signup = () => {
  const data = useActionData();
  return (
    <Form method="POST" action="/signup" >
      <div>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="email"
        />
      </div>
      <div>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
        />
      </div>
      <div>
        <input
          type="confirm-password"
          name="confirm-password"
          id="confirm-password"
          placeholder="confirm-password"
        />
      </div>
      <div>
        <input type="submit" value="Signup"/>
      </div>
      {data?.error && <p>{data.error}</p>}
      {data?.message && <p>{data.message}</p>}
    </Form>
  );
};

export default Signup;
