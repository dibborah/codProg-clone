import { Fragment } from "react";
import { Form, NavLink, Outlet, useRouteLoaderData } from "react-router-dom";

function RootLayout() {
  const user = useRouteLoaderData("parentRoute");// This is also not working
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
        {
          user && (
            <Form action="/logout" method="POST">
              <button>Logout</button>
            </Form>
          )
        }
      </nav>
      <Outlet />
    </main>
  );
}

export default RootLayout;
