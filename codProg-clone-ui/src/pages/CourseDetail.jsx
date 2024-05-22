import axios from "axios";
import { BASE_URL, SUPABASE_API_KEY } from "../constants";
import { Link, useLoaderData } from "react-router-dom";

export async function courseDetailLoader({ params }) {
    const { id: courseId } = params;
    const endpoint = BASE_URL + `rest/v1/modules?course_id=eq.${courseId}&select=*`;
    const { data: modules } = await axios.get(endpoint, {
        headers: {
            apiKey: SUPABASE_API_KEY
        }
    });
    return {modules, }
}

const CourseDetail = () => {
    const {modules, courseId} = useLoaderData();
    return (
        <div>
        {JSON.stringify(modules)}
        <br />
        <Link to={`/payment/${courseId}`}>Buy Now</Link>
        </div>
    )
}

export default CourseDetail;