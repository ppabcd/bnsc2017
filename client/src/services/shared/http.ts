const prepareAuthHeader = (token?: string, headerParams?: object) => {
    let headers = headerParams || { };
    headers['Authorization'] = 'Bearer ' + token;

    return headers;
};

export { prepareAuthHeader };
