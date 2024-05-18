import { getUser } from "./getUser";
import { redirect } from "react-router-dom";

export const requireAuth = async ({pathname}) => {
  const user = await getUser();
  if(user){
    return null;
  }
  throw redirect(`/login?redirectTo=${pathname}`);// query parameter || search parameter
}