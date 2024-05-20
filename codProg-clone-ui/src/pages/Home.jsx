import axios from "axios";
import { GET_ALL_COURSES, SUPABASE_API_KEY } from "../constants";
import { useLoaderData } from "react-router-dom";

export async function homeLoader() {
  const { data } = await axios.get(GET_ALL_COURSES, {
    headers: {
      apiKey: SUPABASE_API_KEY
    }
  })
  return data;
}
function Home() {
  const courses = useLoaderData();
  return <div>
    <h1>Home Page</h1>
    {courses && courses.map((course) => {
      const { amount, description,currency, name, id } = course;
      return <div key={id}>
        <p>Name: {name}</p>
        <p>Description: {description}</p>
        <p>Price: {amount} {currency}</p>
        <button>View Course</button>
        <hr />
      </div>
    })}
  </div>;
}

export default Home;
