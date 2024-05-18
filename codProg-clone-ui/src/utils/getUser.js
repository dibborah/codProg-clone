export const getUser = async () => {
    if('user' in localStorage){// checking user key in localStorage
        const user = JSON.parse(localStorage.getItem('user'));
        if('access_token' in user && 'expires_at' in user && 'refresh_token' in user, 'user_id' in user){
          return user;
        }
      }
    return null;
}