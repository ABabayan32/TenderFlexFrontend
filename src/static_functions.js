

export function getHeaders() {
    return {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'}
}
export function getAuthenticatedHeaders () {
    const defaultHeaders = getHeaders();
    defaultHeaders["Authorization"] = getCookie("access_token");
   return {
       ...getHeaders(),
       Authorization: this.$cookies('access_token')
   };
}


