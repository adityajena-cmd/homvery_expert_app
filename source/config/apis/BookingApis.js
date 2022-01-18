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
  
const GetAllBookings = (userId, token) => {
    const header = getUserToken(token);

    return axios.get(urlConfig.baseURL + '/bookingstatusmaps?bookingid.assignedto=' + userId, header);
};

 
const GetWalletDetails = (userId, token) => {
    const header = getUserToken(token);

    return axios.get(urlConfig.baseURL + '/wallets?user.id=' + userId, header);
};


const GetWalletTransaction = (userId, token) => {
  const header = getUserToken(token);

  return axios.get(urlConfig.baseURL + '/transactions?wallet.user=' + userId, header);
};




export {
  GetAllBookings,
  GetWalletDetails,
  GetWalletTransaction
};