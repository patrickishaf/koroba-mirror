import axios from "axios";

const primaryHttpInstance = axios.create({
  baseURL: ''
})

export default primaryHttpInstance