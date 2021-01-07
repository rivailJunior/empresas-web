import Cookie from 'js-cookie';

function setCookie (params: object) {
    return Cookie.set('userAccess', params);
}

function getCookie() {
    const ck = Cookie.getJSON('userAccess');
    return ck;
}

function deleteCookie() {
    const ck = getCookie();
    return Cookie.remove(`${ck}`);
}

function transformReqCookieReadble(headers) {
    const ck = decodeURIComponent(headers.cookie).split("=")[1];
    return JSON.parse(ck);
}

export {
    setCookie,
    getCookie,
    deleteCookie,
    transformReqCookieReadble
}