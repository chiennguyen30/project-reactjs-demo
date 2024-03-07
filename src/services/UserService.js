import axios from "./customize-axios";

const fetchAllUser = (page) => {
  return axios(`/api/users?page=${page}`);
};

export { fetchAllUser };
