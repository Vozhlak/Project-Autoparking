import axios from "axios";
import { API_URL } from '../config';
import { setParking, setAuthParking, setIsUsedParking, createParkingReservations, setStoryParkingReservations } from "../redux/parkingReducer";

export const getParking = () => {
  return async dispatch => {
    const response = await axios.get(`${API_URL}api/parking/get`)
    try {
      dispatch(setParking({parkingA: response.data.parkingA, parkingB: response.data.parkingB}));
    } catch(e) {
      console.error(e);
    }
  }
}

export const getAuthParking = (id) => {
  return async dispatch => {
    const response = await axios.get(`${API_URL}api/parking/getUserParking/${id}`, {
      headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
    try {
      dispatch(setAuthParking({userParking: response.data.parking, userParking1: response.data.parking2}));
    } catch(e) {
      console.error(e);
    }
  }
}

export const createParkingUSerReservations = (userId, parkingId, timeArrival, timeDeparture, numberAuto, theCostOfParking, numberOrder) => {
  return async dispatch => {
    const response = await axios.post(`${API_URL}api/parking/createParkingReservations`, {
      userId, parkingId, timeArrival, timeDeparture, numberAuto, theCostOfParking, numberOrder
    }, {
      headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
    try {
      dispatch(createParkingReservations({userParking: response.data.parking}));
    } catch(e) {
      console.log(e);
    }
  }
}

export const sendPayCheckEmail = async(userId, parkingId, timeArrival, timeDeparture, numberAuto, theCostOfParking, numberOrder) => {
  const response = await axios.post(`${API_URL}api/parking/sendEmailCheckPay`, {
    userId, parkingId, timeArrival, timeDeparture, numberAuto, theCostOfParking, numberOrder
  }, {
    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
  })
  try {
    return response;
  } catch(e) {
    console.log(e);
  }
}

export const setisUsed = (id) => {
  return async dispatch => {
    try {
      const response = await axios.post(`${API_URL}api/parking/update/${id}`);
      dispatch(setIsUsedParking({parking: response.data.getDataParking}));
    } catch(e) {
      console.error(e);
    }
  }
}
export const getParkingReservations = (id) => {
  return async dispatch => {
    const response = await axios.get(`${API_URL}api/parking/getStoryParking/${id}`, {
      headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
    try {
      dispatch(setStoryParkingReservations({StoryParkingReservations: response.data.storyParkingReservations}));
    } catch(e) {
      console.error(e);
    }
  }
}