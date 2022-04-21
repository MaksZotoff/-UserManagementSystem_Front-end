import axios from 'axios';
const API_URL = 'http://localhost:8080/project';


class ProjectService {

  findAll() {
    return axios.get(API_URL + `/`);
  }

  findOne(id_project) {
      return axios.get(API_URL + `/${id_project}`);
  }

  findByTitle(title) {
    return axios.get(API_URL + `?title=${title}`);
  };

  addProject(title) {
    return axios.post(API_URL + '/addproject', {
      title
    });
  }

  update(id_project, data) {
      return axios.put(API_URL + `/${id_project}`, data);
  }

  remove(id_project) {
    return axios.delete(API_URL + `/${id_project}`);
  }

}

export default new ProjectService();