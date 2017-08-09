import api from './shared/api';
import * as http from './shared/http';

export default {
    login(data) {
        return api.post('auth/login', data);
    },
    validateToken() {
        let headers = http.prepareAuthHeader(localStorage.getItem("token"));

        return api.get('authenticate', {headers: headers});
    },
    profile() {
        let headers = http.prepareAuthHeader(localStorage.getItem("token"));

        return api.get('profile', {headers: headers});
    }
}


