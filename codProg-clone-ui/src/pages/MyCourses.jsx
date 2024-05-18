import { redirect } from "react-router-dom";
import { getUser } from "../utils/getUser";

export const myCoursesLoader = async () => {
  const user = await getUser();
  if(user){
    return null;
  }
  return redirect('/login?redirectTo=/my-courses');// query parameter || search parameter
}

const MyCourses = () => {
  return <div>MyCourses</div>;
};

export default MyCourses;
