import axios from "axios";

const { REACT_APP_API_URL } = process.env;

let store; // Это стандартный store

export const propsStoreFN = (oldStore) => {
  store = oldStore;
};

const axiosInstance = axios.create({
  baseURL: REACT_APP_API_URL,
  timeout: 1000,
  // headers: {
  //   Authorization: `Bearer ${
  //     store?.getState()?.saveDataSlice?.dataSave?.token?.accessToken
  //   }`,
  // },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const state = store?.getState();
    const user_guid = store?.getState()?.saveDataSlice?.dataSave?.guid;
    const agent_guid = store?.getState()?.saveDataSlice?.dataSave?.guid;
    const user_type = state?.saveDataSlice?.dataSave?.user_type;
    const token = state?.saveDataSlice?.dataSave?.token?.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Добавляем guid в тело запроса, если это POST запрос
    if ((config.method === "post" || config.method === "put") && user_guid) {
      config.data = { user_guid, user_type, agent_guid, ...config.data };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const { dispatch } = store;
        // dispatch(getToken()); // Получаю токен
        return axiosInstance.request(originalRequest);
      } catch (e) {
        console.log("Не удалось авторизоваться");
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
