import axios from "axios";
axios.interceptors.request.use(config=>{
    if(sessionStorage.getItem("token")){
        config.headers.Authorization = JSON.parse(sessionStorage.getItem("token"));
        console.log(config)
    }
    return config;
},err=>{
    console.log(err);
    return Promise.reject(err);
})
export default axios;