import axios from "axios";
import { Form, redirect, useActionData } from "react-router-dom";
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
    const response = await axios.post(LOGIN_URL, JSON.stringify(credentails), {
      // This are configurations as a 3rd parameter
      headers: {
        // apiKey: SUPABASE_API_KEY + "ijhbb",
        apiKey: SUPABASE_API_KEY,
        "Content-Type": "application/json",
      },
    });
    const { access_token, refresh_token, expires_at } = response.data;
    const user = { access_token, refresh_token, expires_at };
    console.log(user);
    // redirect to homePage
    return redirect("/"); // redirect is always to be return// If something is not working one reason can be you are not returning it or anything
  } catch (error) {
    if (error.response.request.status === 400) {
      console.log(error.response);
      console.log("Wrong username or password");
      return { error: "Wrong username or password" };
    } else {
      console.log(error.message); // Less detailed
      console.log(error.response.data.message); // Detailed
      return { error: error?.response?.data?.message || error?.message };
    }
  }
};

function Login() {
  const data = useActionData();
  console.log(data);
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
      {data && data.error && <p>{data.error}</p>}
    </Form>
  );
}


export default Login;

/**
  <p>{data?.error}</p>// We be emptity evalutes in HTML DOM Elements unnecessarily
 * 
 * undefined never evaluates
 *    {data?.error}
endpoint ke .../v1 => Is the Base URL
*/

