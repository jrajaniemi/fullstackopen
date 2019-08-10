import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

const getAllPersons = () => {
  return axios.get(baseUrl).then(res => res.data);
};

const addPerson = newPerson => {
  return axios.post(baseUrl, newPerson).then(res => res.data);
};

const updatePerson = (id, updatedPerson) => {
  axios.put(baseUrl + id, updatePerson).then(res => res.data);
};

const deletePerson = id => {};

export default { getAllPersons, addPerson, updatePerson, deletePerson };
