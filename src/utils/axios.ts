import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://backendculturalpassport-1.onrender.com'
  });

  export default instance