import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { About, Home, Login, MyCourses, Signup, Profile } from "./pages";
import RootLayout from "./layout/RootLayout";
import { loginAction, loginLoader } from "./pages/Login";
import { myCoursesLoader } from "./pages/MyCourses";
import { profileLoader } from "./pages/Profile";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout/>}>
      <Route index element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route
       path="/login"
       element={<Login />}
       action={loginAction}
       loader={loginLoader}
      />
      <Route path="signup" element={<Signup />} />
      <Route path="/my-courses"
        element={<MyCourses />}
        loader={myCoursesLoader}
      />
      <Route path="/profile"
        element={<Profile />}
        loader={profileLoader}
      />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router}>App</RouterProvider>;
}

export default App;
