import axios from "./customize-axios";

const fetchAllUser = () => {
  return axios("/api/users?page=1");
};

export { fetchAllUser };
