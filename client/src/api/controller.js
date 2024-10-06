import axios from "./service";

const controller = {
  get: (path) => axios.get(path).then((data) => data),
};

const controllerPut = {
  put: (data) => axios.put(`http://`, data).then((data) => data),
};

const controllerPost = {
  post: (data, path) =>
    axios
      .post(`api/${path}`, data,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(`Error: ${error.message}`);
        throw error;
      }),
};

export { controller, controllerPut, controllerPost };
