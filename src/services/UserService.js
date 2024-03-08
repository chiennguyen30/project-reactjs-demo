import axios from "./customize-axios";

const fetchAllUser = (page) => {
  return axios(`/api/users?page=${page}`);
};
const CreateUser = (name, job) => {
  return axios.post(`/api/users`, { data: { name: name, job: job } });
};

export { fetchAllUser, CreateUser };
