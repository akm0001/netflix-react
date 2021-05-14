import axios from "axios"

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
});

export default instance;

// https://api.themoviedb.org/3/movie/550?api_key=1407de01a24d62175988cd1602afe331