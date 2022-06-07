import axios from 'axios';

const API_URL = 'http://localhost:8080/user';


class AdminService {

  findAll() {
    return axios.get(API_URL + `/`);
  }

  findOne(id_user) {
      return axios.get(API_URL + `/${id_user}`);
  }

  findByLogin(username) {
    return axios.get(API_URL + `?username=${username}`);
  };

  addUser( email, phone, password, role, username, name, surname, salary) {
    return axios.post(API_URL + '/adduser', {
      email,
      phone,
      password,
      role,
      username,
      name,
      surname,
      salary,
    });
  }

  update(id_user, data) {
      return axios.put(API_URL + `/${id_user}`, data);
  }

  remove(id_user) {
    return axios.delete(API_URL + `/${id_user}`);
  }

}

export default new AdminService();