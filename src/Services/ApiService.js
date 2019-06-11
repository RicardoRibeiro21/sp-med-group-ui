import axios from 'axios';

export default {
    call(endpoint) {
        let URL = `http://192.168.3.96:5000/api/${endpoint}`;
        return {
            getOne: ({ id }) => axios.get(`${URL}/${id}`),
            getAll: () => axios.get(`${URL}`),
            update: (toUpdate) =>  axios.put(URL,toUpdate),
            create: (toCreate) =>  axios.post(URL,toCreate),
            delete: ({ id }) =>  axios.delete(`${URL}/${id}`)
        }
    }
}