
export const isTokenExpired = async (tokenTimeStamp) => {
    const currentTime = Math.floor(Date.now() / 1000);
    return currentTime > tokenTimeStamp;
}

export default isTokenExpired;
