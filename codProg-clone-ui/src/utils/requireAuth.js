import { getUser } from "./getUser";
import { redirect } from "react-router-dom";

export const requireAuth = async ({redirectTo}) => {
  const user = await getUser();
  if(user === null){
    // throw breaks the execution in the line it is executed
    throw redirect(`/login?redirectTo=${redirectTo}`);// query parameter || search parameter
  }
} 