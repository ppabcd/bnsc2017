"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var config = {
    baseURL: 'http://localhost:8000/api',
    timeout: 2000
};
exports.default = axios_1.default.create(config);
