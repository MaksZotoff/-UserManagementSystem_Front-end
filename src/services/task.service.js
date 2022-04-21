import axios from 'axios';

const API_URL = 'http://localhost:8080/task';

class TaskService {

    findAll() {
        return axios.get(API_URL + `/`);
    }

    findOne(id_task) {
        return axios.get(API_URL + `/${id_task}`);
    }

    findByTitle(title) {
        return axios.get(API_URL + `?title=${title}`);
    };


    addProject(title, status, createdAt, date_end) {
        return axios.post(API_URL + '/addtask', {
            title, 
            status, 
            createdAt, 
            date_end
        });
    }

    update(id_task, data) {
        return axios.put(API_URL + `/${id_task}`, data);
    }

    remove(id_task) {
        return axios.delete(API_URL + `/${id_task}`);
    }

}

export default new TaskService()


