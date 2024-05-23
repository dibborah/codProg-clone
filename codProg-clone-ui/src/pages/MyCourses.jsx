// import { useRouteLoaderData } from "react-router-dom";
import { getUser } from "../utils/getUser";
import isTokenExpired from "../utils/isTokenExpired";
import refreshToken from "../utils/refreshToken";
import { requireAuth } from "../utils/requireAuth";
import { BASE_URL, SUPABASE_API_KEY } from "../constants";
import axios from "axios";
import { Link, useLoaderData } from "react-router-dom";

export const myCourseLoader = async ({ request }) => {
  const pathname = new URL(request.url).pathname;
  // pathname shoule not be hardcoded
  // Nothing should be hardcoded
  await requireAuth({ redirectTo: pathname });
  let { access_token, expires_at, user_id } = await getUser();
  if (isTokenExpired(expires_at)) {
    access_token = await refreshToken();
  }

  // user_id = "8abe9f45-ffb8-46af-9343-ddbe3f367b7e";

  const subscriptionEndpoint = `${BASE_URL}rest/v1/subscriptions?user_id=eq.${user_id}`;

  const { data: subscriptions } = await axios.get(subscriptionEndpoint, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      apiKey: SUPABASE_API_KEY,
    }
  })

  // console.log('subscriptions', subscriptions);

  // [{}, {}] ---> "1", "2"

  // const courseId = subscriptions.map((course) => {
  //   return course.course_id;
  // }).join(',');

  const courseNumbers = subscriptions.map((course) => `"${course.course_id}"`).join(',');

  // Now need ---> 2 endpoints
  // 1. subscriptions
  // 2. my-courses

  const myCoursesEndpoint = `${BASE_URL}rest/v1/courses?id=in.%28${courseNumbers}%29`;
  
  const { data: myCourses } = await axios.get(myCoursesEndpoint, {
    headers: {
      apiKey: SUPABASE_API_KEY,
      Authorization: `Bearer ${access_token}`
    }
  })

  // console.log('myCourses', myCourses);

  return myCourses;
}

const MyCourses = () => {
  const myCourses = useLoaderData();
  // console.log('loader myCourses', myCourses);
  // const data = useRouteLoaderData('parentRoute');
  // This way we can use Parent route data in children components as well by providing id
  return <div>
    {myCourses && myCourses.map((course) => {
      return <Link key={course.id} to={course.id.toString()}>
       {course.name} <br />
      </Link>
    })}

  </div>;
};

export default MyCourses;
