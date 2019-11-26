import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const create = person => {
    const request = axios.post(baseUrl, person)
    return request.then(response => response.data)
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const remove = (person) => {
    const request = axios.delete(`${baseUrl}/${person.id}`)
    return request.then(response => response.data)
}

const getByName = (person) => {
    return getAll().then(persons => {
        return persons.filter(p => p.name === person.name)
    })
}

const replaceWith = (person) => {
    return getByName(person).then(persons => {
        let id = null;
        if (persons[0]) {
            id = persons[0].id
        }
        return axios.put(`${baseUrl}/${id}`, person).then(response => response.data)
    })
}

export default {
    create,
    getAll,
    remove,
    replaceWith
}