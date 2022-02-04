import axios from 'axios';
import urlConfig from '../config.json';



const getUserToken = (token, isMultipart = false) => {
  if (isMultipart) {
    return {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + token,
      },
    };
  }
  return {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
};

const GetTechnicianDetails = (userId, token) => {
  const header = getUserToken(token);

  return axios.get(urlConfig.baseURL + '/techniciandetails?technician=' + userId, header);
};

const UpdateTechnicianDetails = (userId, token, formData) => {
  const header = getUserToken(token, true);

  return axios.put(urlConfig.baseURL + '/techniciandetails/' + userId, formData, header);
};
const UploadProfile = (token, formData) => {
  const header = getUserToken(token, true);

  return axios.post(urlConfig.baseURL + '/upload', formData, header);
};
const UpdateUser = (userId, token, formData) => {
  const header = getUserToken(token, true);

  return axios.put(urlConfig.baseURL + '/users/' + userId, formData, header);
};


const GetAllLinks = (token) => {
  const header = getUserToken(token);

  return axios.get(urlConfig.baseURL + '/settings', header);

}

const GetServiceArea = (token, userId) => {
  const header = getUserToken(token);

  return axios.get(urlConfig.baseURL + '/technicianservicesmaps?technicianuser.id=' + userId, header);

}

export {
  GetTechnicianDetails,
  UpdateTechnicianDetails,
  GetAllLinks,
  GetServiceArea,
  UpdateUser,
  UploadProfile

};