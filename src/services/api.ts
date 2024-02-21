import axios from 'axios';

const api = axios.create({
  baseURL: 'https://iapitest.eva.guru/',
});

export default api;