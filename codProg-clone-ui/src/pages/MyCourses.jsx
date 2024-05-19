import { useRouteLoaderData } from "react-router-dom";
import { requireAuth } from "../utils/requireAuth";

export const myCoursesLoader = async ({request}) => {
  const pathname = new URL(request.url).pathname;
  // pathname shoule not be hardcoded
  // Nothing should be hardcoded
  await requireAuth({redirectTo: pathname});
  return null;
}

const MyCourses = () => {
  const data = useRouteLoaderData('parentRoute');
  // This way we can use Parent route data in children components as well by providing id
  return <div>MyCourses</div>;
};

export default MyCourses;
