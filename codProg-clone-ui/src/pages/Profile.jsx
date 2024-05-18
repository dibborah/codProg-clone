import { requireAuth } from "../utils/requireAuth";

export const profileLoader = async ({request}) => {
  const pathname = new URL(request.url).pathname;
  await requireAuth({pathname});
  return null;
};

const Profile = () => {
  return <div>Profile</div>;
};

export default Profile;
