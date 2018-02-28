import tokenService from './tokenService';

function setToken(token) {
    if(token) {
        localStorage.setItem('token', token);
    } else {
        localStorage.removeItem('token');
    }
}

function getUser() {
    return tokenService.getUserFromToken();
}

function getUserFromToken() {
    var token = getToken();
    return token ? JSON.parse(atob(token.split('.')[1])).user : null;

}

function getToken(){
    var token = localStorage.getItem('token');
    if(token){
        var payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.exy < Date.now() /1000) {
            localStorage.removeItem('token');
            token = null;
        }
    } 
    return token;
}

function removeToken() {
    localStorage.removeItem('token');
}

export default {
    getToken,
    getUserFromToken,
    setToken,
    getUser,
    removeToken
};