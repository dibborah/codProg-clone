import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { About, Home, Login, MyCourses, Signup } from "./pages";
import RootLayout from "./layout/RootLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout/>}>
      <Route index element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/mycourses" element={<MyCourses />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router}>App</RouterProvider>;
}

export default App;
