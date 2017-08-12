"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prepareAuthHeader = function (token, headerParams) {
    var headers = headerParams || {};
    headers['Authorization'] = 'Bearer ' + token;
    return headers;
};
exports.prepareAuthHeader = prepareAuthHeader;
