import axios from "./customize-axios";

const fetchAllUser = (page) => {
  return axios(`/api/users?page=${page}`);
};
const CreateUser = (name, job) => {
  return axios.post(`/api/users`, { name, job });
};
const putUpdateUser = (name, job) => {
  return axios.put(`/api/users/2`, { name, job });
};

export { fetchAllUser, CreateUser, putUpdateUser };
