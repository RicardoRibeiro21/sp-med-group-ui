import axios from 'axios';

export default {
    call(endpoint) {
        let URL = `http://localhost:5001/api/${endpoint}`;
        return {
            getOne: ({ id }) => axios.get(`${URL}/${id}`),
            getAll: () => axios.get(`${URL}`),
            update: (toUpdate) =>  axios.put(URL,toUpdate),
            create: (toCreate) =>  axios.post(URL,toCreate),
            delete: ({ id }) =>  axios.delete(`${URL}/${id}`)
        }
    }
}