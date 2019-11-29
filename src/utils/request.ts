import axios from 'axios'

const baseUrl = process.env.VUE_APP_BASE_URL

function request(uri: string, data: any, config: { [key: string]: any }) {
    return axios.post(baseUrl + uri, data, config)
}

export {
    request
}