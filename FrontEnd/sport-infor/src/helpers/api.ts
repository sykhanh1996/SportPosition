import axios from "axios";
import env from "react-dotenv";
import { UrlConstants } from "../constants";
import { AppState, store } from "../store";
import { history } from './history';

const api = axios.create({
    baseURL: `${env.API_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
intercept any error responses from the api
and check if the token is no longer valid.
ie. Token has expired or user is no longer
authenticated.
logout the user if the token has expired
**/

api.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response.status === 401) {
            const originalRequest = err.config;
            const currentState = store.getState() as AppState;

            // Prevent infinite loops
            if (
                err.response.status === 401 &&
                originalRequest.url === `${env.API_URL}/api/v1/auth/refresh-token/`
            ) {
                history.push(UrlConstants.LOGIN);
                return Promise.reject(err);
            }


        }
        return Promise.reject(err);
    }
);

export { api };
