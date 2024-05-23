import axios from "axios";
import { getUser } from "../utils/getUser";
import isTokenExpired from "../utils/isTokenExpired";
import refreshToken from "../utils/refreshToken";
import { requireAuth } from "../utils/requireAuth";
import { BASE_URL, SUPABASE_API_KEY } from "../constants";
import { useLoaderData } from "react-router-dom";
import ReactPlayer from "react-player/vimeo";

export const myCourseVideosLoader = async ({ request, params }) => {
    const pathname = new URL(request.url).pathname
    const { courseId } = params;
    await requireAuth({ redirectTo: pathname });
    let { access_token } = await getUser();
    if (isTokenExpired(access_token)) {
        access_token = await refreshToken();
    }

    // url = 
    // curl 'https://plwxicqvwcxgnmzzixwy.supabase.co/rest/v1/videos?select=module_id' \
    // -H "apikey: SUPABASE_KEY" \
    // -H "Authorization: Bearer SUPABASE_KEY"

    const moduleURL = BASE_URL + `rest/v1/modules?course_id=eq.${courseId}&select=*`;

    const { data: modules } = await axios.get(moduleURL, {
        headers: {
            apiKey: SUPABASE_API_KEY
        }
    })

    const videos = await Promise.all(modules.map(module => {
        return axios.get(`${BASE_URL}rest/v1/videos?module_id=eq.${module.id}&select=*`, {
            headers: {
                apiKey: SUPABASE_API_KEY,
                Authorization: `Bearer ${access_token}`,
            }
        })
    }));

    // console.log('videos', videos);
    // const videosData = videos.map(video => video.data);// This returns a 2D Array
    // Now we will have to flat it!!!
    const videosData = [].concat(...videos.map(video => video.data));

    return videosData;
}

const MyCourseVideos = () => {
    const videosData = useLoaderData();
    console.log('videosData in loader', videosData)
    // some video players
    // plyr 
    // HLS
    // vimeo self player
    return (
        <div>
            <h1>Videos Below</h1>
            {videosData && (
                videosData.map((video) => {
                    return video?.vimeo_url ?
                        <div key={video.id}>
                            <h2>{video.name}</h2>
                            <ReactPlayer url={video.vimeo_url} controls />
                            <hr />
                        </div>
                        : null
                })
            )}
        </div>
    )
}

export default MyCourseVideos;
