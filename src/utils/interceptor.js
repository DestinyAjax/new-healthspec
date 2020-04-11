import fetchIntercept from 'fetch-intercept';
import { removeStorage } from './storage';

export const unregister = fetchIntercept.register({
    request: function (url, config) {
        // Modify the url or config here
        return [url, config];
    },

    requestError: function (error) {
        // Called when an error occured during another 'request' interceptor call
        return Promise.reject(error);
    },

    response: function (response) {
        return response;

        console.dir('response');
        console.dir(response);
    },

    responseError: function (error) {

        removeStorage('ohis:auth_token');
        removeStorage('ohis:reduxState');
        window.location.href = "/auth";

        return Promise.reject(error);
    }
});