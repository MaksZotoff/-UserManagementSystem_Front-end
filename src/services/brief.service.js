import axios from 'axios';
const API_URL = 'http://localhost:8080/brief';

class BriefService {

    findAll() {
        return axios.get(API_URL + `/`);
    }

    findOne(id_brief) {
        return axios.get(API_URL + `/${id_brief}`);
    }

    findByTitle(title) {
        return axios.get(API_URL + `?title=${title}`);
    };

    addBrief(data) {
        return axios.post(API_URL + '/addbrief', data); 
    }

    update(id_brief, data) {
        return axios.put(API_URL + `/${id_brief}`, data);
    }

    remove(id_brief) {
        return axios.delete(API_URL + `/${id_brief}`);
    }

}

export default new BriefService()


