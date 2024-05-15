import { Form } from "react-router-dom";

function Login() {
  return (
    <Form method="POST">
      <div>
        <input
          type="text"
          name="email"
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
