import axios from "axios";

export const getCurrentUserProfile = () => axios.get('/users')