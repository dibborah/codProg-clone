import { requireAuth } from "../utils/requireAuth";

export const myCoursesLoader = async ({request}) => {
  const pathname = new URL(request.url).pathname;
  // pathname shoule not be hardcoded
  // Nothing should be hardcoded
  await requireAuth({pathname});
  return null;
}

const MyCourses = () => {
  return <div>MyCourses</div>;
};

export default MyCourses;
