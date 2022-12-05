import axios from 'axios';

import { transformResponse } from '../utils/commonUtils';

const config = {

    baseURL: 'api/',

    // `transformResponse` allows changes to the response data to be made before
    // it is passed to then/catch
    // ref - https://github.com/axios/axios/issues/430#issuecomment-296279932
    transformResponse: [].concat(
        axios.defaults.transformResponse,
        transformResponse,
    ),

    // `timeout` specifies the number of milliseconds before the request times out.
    // If the request takes longer than `timeout`, the request will be aborted.
    timeout: 30000, // default is `0` (no timeout)
}


const instance = axios.create(config);

export default instance;