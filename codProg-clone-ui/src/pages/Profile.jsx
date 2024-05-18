import { redirect } from "react-router-dom";
import { getUser } from "../utils/getUser";

export const profileLoader = async ({request}) => {
  const pathname = new URL(request.url).pathname;
  const user = await getUser();
  if(user){
    return null;
  }
  return redirect(`/login?redirectTo=${pathname}`);
};

const Profile = () => {
  return <div>Profile</div>;
};

export default Profile;
