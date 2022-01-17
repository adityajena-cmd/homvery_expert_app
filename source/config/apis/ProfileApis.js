import axios from 'axios';
import urlConfig from '../config.json';



const getUserToken = (token,isMultipart=false) => {
    if(isMultipart){
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

const UpdateTechnicianDetails = (userId, token,formData) => {
  const header = getUserToken(token,true);

  return axios.put(urlConfig.baseURL + '/techniciandetails/' + userId,formData, header);
};


export {
  GetTechnicianDetails ,
  UpdateTechnicianDetails
};