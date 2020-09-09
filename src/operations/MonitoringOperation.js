import axios from 'axios';

axios.defaults.timeout = 5000;
axios.defaults.withCredentials = true;


export function getApiData() {
  return axios.get('https://run.mocky.io/v3/671b609c-b85b-4a37-9fa9-99454ff0247f')
    .then((data) => {
      // console.log(`getApiData() - data: ${JSON.stringify(data.data, null, 4)}`);
      return data.data;
    })
    .catch(e => {
      console.log(e);
    });
}

export default {
  getApiData,
}
