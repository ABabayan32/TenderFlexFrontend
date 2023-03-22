import router from "@/router";


export function getHeaders() {
    return {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'}
}

export function getAuthenticatedHeaders () {
    return {
        ...getHeaders(),
        Authorization: 'Bearer ' + $cookies.get('access_token')
    };

}

export function logout() {
    $cookies.remove('access_token');
    $cookies.remove('role');
    router.replace('/login');
}
export function formatDate(date) {
    return new Intl.DateTimeFormat(['ban', 'id']).format(date);
}


