import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getSouv = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/souvenirs.json`)
    .then((response) => {
      const souvObjects = response.data;
      const souvs = [];

      if (souvObjects) {
        Object.keys(souvObjects).forEach((souvId) => {
          souvObjects[souvId].id = souvId;
          souvs.push(souvObjects[souvId]);
        });
      }

      resolve(souvs);
    })
    .catch((err) => reject(err));
});

const getSouvById = (souvId) => axios.get(`${baseUrl}/souvenirs/${souvId}.json`);

const addSouv = (newSouvObj) => axios.post(`${baseUrl}/souvenirs.json`, newSouvObj);

const deleteSouv = (souvId) => axios.delete(`${baseUrl}/souvenirs/${souvId}.json`);

const editSouv = (souvId, updatedSouv) => axios.put(`${baseUrl}/souvenirs/${souvId}.json`, updatedSouv);

export default {
  getSouv,
  getSouvById,
  addSouv,
  deleteSouv,
  editSouv,
};
