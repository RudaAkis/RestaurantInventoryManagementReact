import axios from "axios";

// { baseURL: "http://localhost:8080",} ------> this line needs to be inserted into the axios.create() to remove the repeated BASE URL from other axios calls

const axiosInstance = axios.create({
	headers: {
		"Content-Type": "application/json",
	},
});

axiosInstance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("jwt");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`; // ${token}
		}
		return config;
	},
	(error) => Promise.reject(error)
);

export default axiosInstance;
