import { redirect } from "react-router-dom";
import { getUser } from "../utils/getUser";

export const myCoursesLoader = async ({request}) => {
  const pathname = new URL(request.url).pathname;
  const user = await getUser();
  if(user){
    return null;
  }
  // pathname shoule not be hardcoded
  // Nothing should be hardcoded
  return redirect(`/login?redirectTo=${pathname}`);// query parameter || search parameter
}

const MyCourses = () => {
  return <div>MyCourses</div>;
};

export default MyCourses;
