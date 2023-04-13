import axios from "axios";

const primaryConnector = axios.create({
  baseURL: '',
});

export default primaryConnector;