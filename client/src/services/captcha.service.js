import api from './shared/api';
import * as http from './shared/http';

export default {
    getCaptcha() {
        return api.get('captcha');
    }
}
