import axios from 'axios';

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

export default {
    get(url, data) {
        return axios.get(url, {
            parms: data
        }).then(res => res.data);
    },
    post(url, data) {
        return axios.post(url, data).then(res => res.data);
    }
};