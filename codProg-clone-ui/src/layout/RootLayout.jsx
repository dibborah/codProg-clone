import { Fragment } from "react";
import { Form, NavLink, Outlet, useRouteLoaderData } from "react-router-dom";

function RootLayout() {
  const user = useRouteLoaderData("parentRouteData");// This is also not working
  console.log('user', user);
  return (
    <main>
      <nav>
        <h1 className="logo">
          <NavLink to={"/"}>CodProg</NavLink>
        </h1>
        <ul>
          <li>
            <NavLink to={"about"}>About</NavLink>
          </li>
          {
            user && (
              <Fragment>
                <li>
                  <NavLink to={"profile"}>Profile</NavLink>
                </li>
                <li>
                  <NavLink to={"my-courses"}>MyCourses</NavLink>
                </li>
              </Fragment>
            )
          }
          {
            !user && (
              <Fragment>
                <li>
                  <NavLink to={"signup"}>Signup</NavLink>
                </li> 
                <li>
                  <NavLink to={"login"}>Login</NavLink>
                </li>
              </Fragment>
            )
          }
        </ul>
        <Form action="/login" method="POST">
          <button type="submit">Logout</button></Form>
      </nav>
      <Outlet />
    </main>
  );
}

export default RootLayout;
