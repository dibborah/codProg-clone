import { requireAuth } from "../utils/requireAuth";

export const profileLoader = async ({request}) => {
  const pathname = new URL(request.url).pathname;
  await requireAuth({redirectTo: pathname});// in requireAuth throw is used so execution will be broken here
  return null;
};

const Profile = () => {
  return <div>Profile</div>;
};

export default Profile;
