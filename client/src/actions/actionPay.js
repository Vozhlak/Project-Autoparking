import axios from "axios";
import { API_URL } from '../config';
import { setBillId } from '../redux/payReducer';
import { setDataPayQiwi, getDataPayQiwi } from "../redux/payReducer";

export const createPay = () => {
  return async dispatch => {
    const response = await axios.get(`${API_URL}api/oplata.qiwi.com/create`)
    try {
      dispatch(setBillId({billid: response.data.dataPay}));
    } catch(e) {
      console.error(e);
    }
  }
}

export const setDataPay = (dataPayQiwi) => {
  return async dispatch => {
    const response = await axios.post(`${API_URL}api/setDataPayQiwi`, {
      dataPayQiwi
    })
    try {
      dispatch(setDataPayQiwi({currentPayClient: response.data.paydata}));
    } catch(e) {
      console.error(e);
    }
  }
}

export const getDataPay = (billid) => {
  return async dispatch => {
    const response = await axios.get(`${API_URL}api/getDataPayQiwi/${billid}`)
    try {
      dispatch(getDataPayQiwi({PaymentConfirmationClient: response.data.dataPay}));
    } catch(e) {
      console.error(e);
    }
  }
}