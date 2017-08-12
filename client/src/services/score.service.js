import api from './shared/api';
import * as http from './shared/http';

export default {
    getHighScore(type) {
        let headers = http.prepareAuthHeader(localStorage.getItem("token"));

        let url = "score/" + type;

        return api.get(url, {headers: headers});
    },
    saveScore(data) {
        let headers = http.prepareAuthHeader(localStorage.getItem("token"));

        return api.post('score', data, { headers: headers });
    }
}
