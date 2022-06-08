import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createParkingUSerReservations, setisUsed } from '../../actions/actionParking';
import { setDataPay } from '../../actions/actionPay';
import './PagePay.scss';

const PagePay = () => {
  const [userID, setUserId] = useState('');
  const [parkingId, setParkingId] = useState('');
  const [fullDateTimeArrival, setFullDateTimeArrival] = useState('');
  const [fullDateTimeDeparture, setFullDateTimeDeparture] = useState('');
  const [numberAuto, setNumberAuto] = useState('');
  const [theCostOfParking, setTheCostofParking] = useState('');
  const [orderValue, setOrderValue] = useState('');
  
  const dispatch = useDispatch();

  const dataPay = useSelector(state => state.dataPay.currentPay);
  const billid = useSelector(state => state.dataPay.billid);

  function setDataPayValue(dataPay) {
    setUserId(dataPay.userId);
    setParkingId(dataPay.ParkingId);
    setFullDateTimeArrival(dataPay.fullDateTimeArrival);
    setFullDateTimeDeparture(dataPay.fullDateTimeDeparture);
    setNumberAuto(dataPay.numberAuto);
    setTheCostofParking(dataPay.theCostOfParking);
    setOrderValue(billid.billId);
    localStorage.setItem('billid', billid.billId);
    console.log(userID, parkingId,fullDateTimeArrival, fullDateTimeDeparture, numberAuto, theCostOfParking, orderValue);
  }

  function AddPaymentConfirmations() {
    dispatch(setDataPay({payDataClient: {dataPay, billid}}));
    setTimeout(() => {
      window.location = `${billid.payUrl}`;
    }, 3000)
  }

  useEffect(() => {
    console.log({payDataClient: {dataPay, billid}});
    setDataPayValue(dataPay);
    if(userID && parkingId && fullDateTimeArrival && fullDateTimeDeparture && numberAuto && theCostOfParking && orderValue) {
      AddPaymentConfirmations();
    }
  }, [userID, parkingId, fullDateTimeArrival, fullDateTimeDeparture, numberAuto, theCostOfParking, orderValue]);

  return (
    <div className='wrapPagePay'>
      <h1 className='title'>Переходим на страницу оплаты...</h1>
    </div>
  );
}

export { PagePay };
