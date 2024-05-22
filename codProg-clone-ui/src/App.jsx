import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { About, Home, Login, MyCourses, Signup, Profile, CourseDetail } from "./pages";
import RootLayout from "./layout/RootLayout";
import { loginAction, loginLoader } from "./pages/Login";
import { myCoursesLoader } from "./pages/MyCourses";
import { profileLoader } from "./pages/Profile";
import { signupAction, signupLoader } from "./pages/Signup";
import { getUser } from "./utils/getUser";
import { logoutAction } from "./pages/Logout";
import { homeLoader } from "./pages/Home";
import { courseDetailLoader } from "./pages/CourseDetail";
import Payment from "./pages/Payment";

const router = createBrowserRouter(
  createRoutesFromElements( // What ever function is passed in loader in Route's parent component is accessed within its every children component
    <Route path="/" element={<RootLayout/>} loader={getUser} id="parentRoute">
      <Route index element={<Home />} loader={homeLoader}/>
      <Route path="/about" element={<About />} />
      <Route
       path="/login"
       element={<Login />}
       action={loginAction}
       loader={loginLoader}
      />
      <Route 
        path="signup"
        element={<Signup />}
        loader={signupLoader}
        action={signupAction}
      />
      <Route path="/my-courses"
        element={<MyCourses />}
        loader={myCoursesLoader}
      />
      <Route path="/course-detail/:id"
        element={<CourseDetail />}
        loader={courseDetailLoader}
      />
      <Route path="/profile" 
        element={<Profile />}
        loader={profileLoader}
      />
      <Route path="logout" action={logoutAction}/>
      <Route path="/payment/:courseId" element={<Payment />}/>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router}>App</RouterProvider>;
}

export default App;
