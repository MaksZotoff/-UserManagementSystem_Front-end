import axios from 'axios';

const API_URL = 'http://localhost:8080/brief';

class TaskService {

    findAll() {
        return axios.get(API_URL + `/`);
    }

    findOne(id_brief) {
        return axios.get(API_URL + `/${id_brief}`);
    }

    findByTitle(title) {
        return axios.get(API_URL + `?title=${title}`);
    };

    addTask(title, id_user, status, createdAt) {
        return axios.post(API_URL + '/addbrief', {
            title, 
            id_user,
            status, 
            createdAt,
        });
    }

    update(id_brief, data) {
        return axios.put(API_URL + `/${id_brief}`, data);
    }

    remove(id_brief) {
        return axios.delete(API_URL + `/${id_brief}`);
    }

}

export default new TaskService()


