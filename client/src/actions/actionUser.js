import axios from 'axios';
import { setUser } from '../redux/userReducer';
import { API_URL } from '../config';
import jwt_decode from "jwt-decode";

export const sendEmail = async(email) => {
  const res = await axios.post(`${API_URL}api/user/sendEmailActivation`, {
    email
  })
  return res;
}

export const registration = async(email, password) =>  {
  const res = await axios.post(`${API_URL}api/user/registration`, {
    email,
    password
  })
  return res;
}

export const login = (email, password) => {
  return async dispatch => {
    const response = await axios.post(`${API_URL}api/user/login`, {
      email,
      password
    })
    try {
      console.log('Login start')
      localStorage.setItem('token', response.data.token);
      dispatch(setUser({user: response.data.user}));
      console.log('Login: ', response.data.user);
    }
    catch(e) {
      console.error(e);
    }
  }
}

export const check = () => {
  return async dispatch => {
    try {
      const response = await axios.get(`${API_URL}api/user/auth`, {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
      })
      console.log('Check start')
      localStorage.setItem('token', response.data.token);
      dispatch(setUser({user: response.data.user}))
      console.log({user: response.data.user});
      console.log('Check end')
    }
    catch(e) {
      console.log(e);
    }
  }
}