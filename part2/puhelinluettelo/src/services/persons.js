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
    // I'm not returning the request data. It doesn't really matter, but maybe I should?
    return getByName(person).then(persons => {
        axios.put(`${baseUrl}/${persons[0].id}`, person)
    })
}

export default {
    create,
    getAll,
    remove,
    replaceWith
}