import axios from 'axios';
const baseUrl = '/api/persons';

const getAllPersons = () => {
  return axios.get(baseUrl).then(res => res.data);
};

const addPerson = newPerson => {
  return axios.post(baseUrl, newPerson).then(res => res.data);
};

const updatePerson = (id, updatedPerson) => {
  return axios.put(baseUrl + '/' + id, updatedPerson).then(res => res.data);
};

const deletePerson = id => {
  return axios.delete(baseUrl + '/' + id).then(res => res.data);
};

export default { getAllPersons, addPerson, updatePerson, deletePerson };
