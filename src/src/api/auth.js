import axios from 'axios'
import axiosHelper from '@/api/axiosHelper'

const BASE_URI = '/api/auth/';
const XSRF_VERBS = ['post', 'put', 'patch', 'delete'];

const loggedOutSessionPath = '/api/session.json';
const loggedInSessionPath = '/api/session-loggedin.json';
let overrideSessionPath = loggedOutSessionPath;

function mapSessionInfoResponse(response) {
    const sessionInfo = response.data.data;

    for (const verb of XSRF_VERBS) {
        axios.defaults.headers[verb]['RequestVerificationToken'] = sessionInfo.antiForgeryToken;
    }

    return sessionInfo.member;
}

export default {

    getSession() {
        return axios
            .get(overrideSessionPath)
            // .get(BASE_URI + 'session')
            .then(mapSessionInfoResponse);
    },

    login(command) {
        return axios
                .get('/api/login-valid.json')
                .then(() => {
                    overrideSessionPath = loggedInSessionPath
                })
                // .post(BASE_URI + 'login', command)
                .then(this.getSession)
                .catch(axiosHelper.handleCommandError);
    },

    register(command) {
        return axios
            .get('/api/register.json')
            .then(() => {
                overrideSessionPath = loggedInSessionPath
            })
            // .post(BASE_URI + 'register', command)
            .then(this.getSession)
            .catch(axiosHelper.handleCommandError);
    },

    signOut() {
        return axios
            .get('/api/signout.json')
            .then(() => {
                overrideSessionPath = loggedOutSessionPath
            })
            // .post(BASE_URI + 'sign-out')
            .then(this.getSession)
            .catch(axiosHelper.handleCommandError);
    }
}