import axios from 'axios'
import axiosHelper from '@/api/axiosHelper'

const BASE_URI = '/api/cats/';

export default {
    searchCats() {
        return axios
            .get('/api/cats.json')
            // .get(BASE_URI)
            .then(axiosHelper.handleQueryResponse);
    },
    
    getCatById(id) {
        return axios
            .get('/api/cats-' + id + '.json')
            // .get(BASE_URI + id)
            .then(axiosHelper.handleQueryResponse);
    },
    
    like(id) {
        return axios
            .get('/api/like.json')
            // .post(BASE_URI + id + '/likes')
            .catch(axiosHelper.handleCommandError);
    },
    
    unlike(id) {
        return axios
            .get('/api/like.json')
            // .delete(BASE_URI + id + '/likes')
            .catch(axiosHelper.handleCommandError);
    }
}