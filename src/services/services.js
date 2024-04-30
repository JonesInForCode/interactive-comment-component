import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/comments'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    return axios.post(`${baseUrl}`, newObject)
        .then((response) => response.data)
}

const update = (id , newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject).then(console.log(id))
    return request.then(response => response.data)
}

const getById = (id) => {
    const request = axios.get(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const deleteById = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

export default {
    getAll,
    create,
    update,
    getById,
    deleteById
}