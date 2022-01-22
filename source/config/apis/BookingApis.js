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

const GetBookingStatus = (bookingId, token) => {
  const header = getUserToken(token);

  return axios.get(urlConfig.baseURL + `/bookingstatusmaps?bookingid=${bookingId}&_sort=created_at:DESC`, header);
};
 
const GetWalletDetails = (userId, token) => {
    const header = getUserToken(token);

    return axios.get(urlConfig.baseURL + '/wallets?user.id=' + userId, header);
};


const GetWalletTransaction = (userId, token) => {
  const header = getUserToken(token);

  return axios.get(urlConfig.baseURL + '/transactions?wallet.user=' + userId, header);
};

const StartTechinician = ( token,body) => {
  const header = getUserToken(token);

  return axios.put(urlConfig.baseURL + '/booking/technicianStarted',body, header);
};
const ReachedTechinician = ( token,body) => {
  const header = getUserToken(token);

  return axios.put(urlConfig.baseURL + '/booking/technicianReached',body, header);
};

const RescheduleBooking = ( token,body) => {
  const header = getUserToken(token);

  return axios.put(urlConfig.baseURL + '/booking/rescheduleBooking',body, header);
};

const RevisitTechinician = ( token,body) => {
  const header = getUserToken(token);

  return axios.put(urlConfig.baseURL + '/booking/revisitBooking',body, header);
};

const ShareQuotation = ( token,body) => {
  const header = getUserToken(token);

  return axios.post(urlConfig.baseURL + '/booking/createQuotation',body, header);
};

const GetInventory = ( token,keyword) => {
  const header = getUserToken(token);

  return axios.get(urlConfig.baseURL + '/inventories?item_name_contains='+keyword, header);
};






export {
  GetAllBookings,
  GetWalletDetails,
  GetWalletTransaction,
  StartTechinician,
  RescheduleBooking,
  ReachedTechinician,
  RevisitTechinician,
  GetBookingStatus,
  GetInventory,
  ShareQuotation as CreateNewQuotation
};