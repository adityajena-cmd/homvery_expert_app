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

const GetTaxToken = (orderID, amount, bookingId) => {
    return axios.get(urlConfig.transaction_url + `/initiateToken?orderId=${orderID}&coins=${amount}&technicianId=${bookingId}`);
};

const CreateTransaction = (token, body) => {
    const header = getUserToken(token);
    return axios.post(urlConfig.baseURL + `/transactions`, body, header);
};
const UpdateWallet = (token, walletId, body) => {
    const header = getUserToken(token);
    return axios.put(urlConfig.baseURL + `/wallets/${walletId}`, body, header);
};
const WithDrawCoin = (token, body) => {
    const header = getUserToken(token);
    return axios.put(urlConfig.baseURL + `/withdraw`,  body,header);
};


export {
    GetTaxToken,
    CreateTransaction,
    UpdateWallet,
    WithDrawCoin
}