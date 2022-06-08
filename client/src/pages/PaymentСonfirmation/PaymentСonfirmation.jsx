import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { API_URL } from '../../config';
import { resetPay } from '../../redux/payReducer';
import { createParkingUSerReservations, setisUsed } from '../../actions/actionParking'


const PaymentConfirmation = () => {
  const dataPay = useSelector(state => state.dataPay.PaymentConfirmationClient);
  const [dataPayClient, setDataPayClient] = useState({
    userID: '',
    parkingId: '',
    fullDateTimeArrival: '',
    fullDateTimeDeparture: '',
    numberAuto: '',
    theCostOfParking: '',
    orderValue: ''
  })
  const billid = localStorage.getItem('billid');
  const dispatch = useDispatch();

  function backMainPage() {
    localStorage.removeItem('billid');
    dispatch(resetPay());
    setTimeout(() => {
      window.location = 'http://localhost:3000/';
    }, 3000)
  }

  const start = async() => {
    try {
      const response = await axios.get(`${API_URL}api/getDataPayQiwi/${billid}`)
      setDataPayClient({userID: response.data.dataPay.userId, parkingId: response.data.dataPay.parkingId,
        fullDateTimeArrival: response.data.dataPay.dateAndTimeOfArrival, fullDateTimeDeparture: response.data.dataPay.dateAndTimeOfDeparture,
        numberAuto: response.data.dataPay.numberAuto, theCostOfParking: response.data.dataPay.theCostOfParking, orderValue: response.data.dataPay.numberOrder});
        console.log(dataPayClient);
        payBronParking();
    } catch(e) {
      console.log(e);
    }
  }

  function payBronParking() {
    if(dataPayClient.userID && dataPayClient.parkingId && dataPayClient.fullDateTimeArrival && dataPayClient.fullDateTimeDeparture &&
      dataPayClient.numberAuto && dataPayClient.theCostOfParking && dataPayClient.orderValue) {
        console.log('Данные успешно добавлены');
      dispatch(createParkingUSerReservations(dataPayClient.userID, dataPayClient.parkingId, dataPayClient.fullDateTimeArrival,
        dataPayClient.fullDateTimeDeparture, dataPayClient.numberAuto, dataPayClient.theCostOfParking, dataPayClient.orderValue));
      dispatch(setisUsed(dataPayClient.parkingId));
      backMainPage();
    } else {
      console.log("Error");
    }
  }
  
  useEffect(() => {
    start();
  }, [dataPayClient.userID, dataPayClient.parkingId, dataPayClient.fullDateTimeArrival, dataPayClient.fullDateTimeDeparture,
    dataPayClient.numberAuto, dataPayClient.theCostOfParking, dataPayClient.orderValue]);

  return (
    <div style={{textAlign: 'center', fontSize: 32}}>
      <h1>Возвращаем вас на главную страницу...</h1>
    </div>
  );
}

export { PaymentConfirmation };
