function abortFetching() {
    console.log('Now aborting');
    controller.abort()
}

function getHeaders() {
    return {
         "Access-Control-Allow-Origin": "*", 'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'}
}
function getAuthenticatedHeaders () {
    const defaultHeaders = getHeaders();
    defaultHeaders["Authorization"] = getCookie("access_token");
   return defaultHeaders;
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


