import axios from "axios";
import { Form } from "react-router-dom";
import { LOGIN_URL, SUPABASE_API_KEY } from "../constants";

export const loginAction = async ({ request }) => {
  const data = await request.formData();
  // console.log("data", data); // This gives us an object with get value in its prototype
  const credentails = {
    email: data.get("email"),
    password: data.get("password"),
  };
  // console.log(credentails);
  // request
  try {
    const response = await axios.post(LOGIN_URL, JSON.stringify(credentails), {// This are configurations as a 3rd parameter
      headers : {
        apiKey: SUPABASE_API_KEY,
        "Content-Type": "application/json"
      },
    });
    const { access_token, refresh_token, expires_at } = response.data;
    const user = { access_token, refresh_token, expires_at };
    console.log(user);
  } catch (error) {
    console.log(error);    
  }

  return null;
};

function Login() {
  return (
    <Form method="POST" action="/login">
      <div>
        <input
          type="text"
          name="email" // Providing name attribute is mandatory when using Form component from r-r-d
          id="email"
          placeholder="email"
          autoComplete="off"
        />
      </div>
      <div>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          autoCapitalize="off"
        />
      </div>
      <div>
        <input type="submit" value="login" />
      </div>
    </Form>
  );
}

export default Login;

// endpoint ke .../v1 => Is the Base URL
