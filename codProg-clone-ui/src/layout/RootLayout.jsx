import { NavLink, Outlet } from "react-router-dom";

function RootLayout() {
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
          <li>
            <NavLink to={"signup"}>Signup</NavLink>
          </li>
          <li>
            <NavLink to={"login"}>Login</NavLink>
          </li>
          <li>
            <NavLink to={"my-courses"}>MyCourses</NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </main>
  );
}

export default RootLayout;
