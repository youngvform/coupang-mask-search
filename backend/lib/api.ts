import axios from 'axios';

const apiClient = axios.create({
    withCredentials: true,
    timeout: 5000
});

export default apiClient;
