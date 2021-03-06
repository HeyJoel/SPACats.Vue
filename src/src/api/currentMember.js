import axios from 'axios'
import axiosHelper from '@/api/axiosHelper'

const BASE_URI = '/api/members/current/';

export default {

    getLikedCats() {
        return axios
            .get('/api/liked.json')
            // .get(BASE_URI + 'cats/liked')
            .then(axiosHelper.handleQueryResponse);
    }
}