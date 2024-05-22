import axios from "axios";
import { Form, redirect, useActionData, useLocation, useNavigation } from "react-router-dom";
import { LOGIN_URL, SUPABASE_API_KEY } from "../constants";
import { getUser } from "../utils/getUser";

export const loginLoader = async () => {
  // Loader Data ko render ya component ke render ya load hone se pehle run hote hain
  // Inhi loaders ke andar hum datqa fetching ka logic likhte hain
  const user = await getUser();
  // below logic by me
  if (user) {
    return redirect("/");
  }
  return null;
  // Alt. logic used in codProg video
  // if(user === null){
  //   return null;
  // }else {
  //   return redirect('/');
  // }
};

export const loginAction = async ({ request }) => {
  const url = request.url;
  const redirectTo = new URL(url).searchParams.get('redirectTo') || '/';// new URL object is made // This is JS
  const data = await request.formData();
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
        apiKey: SUPABASE_API_KEY,
        "Content-Type": "application/json",
      },
    });
    const {
      access_token,
      refresh_token,
      expires_at,
      user: { id: user_id },
    } = response.data;
    const user = { access_token, refresh_token, expires_at, user_id };
    // localStorage
    // sessionStorage
    // HTTP only cookies can't be accessed using JS so our application becomes more secure
    // sessionStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem("user", JSON.stringify(user));
    // redirect to homePage
    // return redirect("/"); // redirect is always to be return
    return redirect(redirectTo);
    // If something is not working one reason can be you are not returning it or anything
  } catch (error) {
    localStorage.removeItem("user");
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
  const navigation = useNavigation();
  const location = useLocation();
  const loginURL = location.pathname + location.search;
  const isSubmitting = navigation.state === 'submitting';
  return (
    // replace word replace kar dega current page ko aane wale page se
    <Form method="POST" action={loginURL} replace>
      <h1>Login Page</h1>
      <p>firstuser@mailinator.com</p>
      <p>React@123</p>
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
        <input type="submit" value={isSubmitting ? 'Submitting...' : 'Login'} disabled={isSubmitting} />
      </div>
      {data && data.error && <p>{data.error}</p>}
    </Form>
  );
}

export default Login;

/**
 * <p>{data?.error}</p>// We be emptity evalutes in HTML DOM Elements unnecessarily
 * undefined never evaluates
 * {data?.error}
   endpoint ke .../v1 => Is the Base URL
*/
