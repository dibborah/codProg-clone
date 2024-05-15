import { Form } from "react-router-dom";

export async function loginAction({ request }) {
  console.log(request);
  const data = await request.formData()
  console.log('data', data);// This gives us an object with get value in its prototype
  const credentails = {
    email: data.get("email"),
    password: data.get("password")
  }
  console.log(credentails, credentails);
  return null;
}

function Login() {
  return (
    <Form method="POST" action="/login">
      <div>
        <input
          type="text"
          name="email"// Providing name attribute is mandatory when using Form component from r-r-d
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
