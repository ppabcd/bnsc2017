import api from './shared/api';
import * as http from './shared/http';

export default {
    register(data) {
        return api.post('auth/register', data);
    }
}
