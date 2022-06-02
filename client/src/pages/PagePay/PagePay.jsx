import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import MyModal from '../../components/Modal/MyModal';
import { createParkingUSerReservations, setisUsed, sendPayCheckEmail } from '../../actions/actionParking';
import { resetPay  } from '../../redux/payReducer';
import './PagePay.scss';

const PagePay = () => {
  const [modal, setModal] = useState();
  const [userID, setUserId] = useState('');
  const [parkingId, setParkingId] = useState('');
  const [fullDateTimeArrival, setFullDateTimeArrival] = useState('');
  const [fullDateTimeDeparture, setFullDateTimeDeparture] = useState('');
  const [numberAuto, setNumberAuto] = useState('');
  const [theCostOfParking, setTheCostofParking] = useState('');
  const [numberOrderValue, setNumberOrderValue] = useState('');
  
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const dataPay = useSelector(state => state.dataPay.currentPay);

  function payBronParking() {
    if(userID && parkingId && fullDateTimeArrival && fullDateTimeDeparture && numberAuto && theCostOfParking) {
      dispatch(createParkingUSerReservations(userID, parkingId, fullDateTimeArrival,
        fullDateTimeDeparture, numberAuto, theCostOfParking, numberOrderValue));
      sendPayCheckEmail(userID, parkingId, fullDateTimeArrival,
          fullDateTimeDeparture, numberAuto, theCostOfParking, numberOrderValue);
      dispatch(setisUsed(parkingId));
      setModal(true);
    } else {
      console.log("Error");
      console.log(userID, parkingId, fullDateTimeArrival, fullDateTimeDeparture, numberAuto, theCostOfParking);
    }
  }

  function backMainPage() {
    dispatch(resetPay());
    navigate('/');
  }

  const rnd = () => {
    const generateNumberOrder = Math.floor(100000 + Math.random() * 900000);
    return generateNumberOrder;
  }

  useEffect(() => {
    console.log(dataPay);
    setUserId(dataPay.userId);
    setParkingId(dataPay.ParkingId);
    setFullDateTimeArrival(dataPay.fullDateTimeArrival);
    setFullDateTimeDeparture(dataPay.fullDateTimeDeparture);
    setNumberAuto(dataPay.numberAuto);
    setTheCostofParking(dataPay.theCostOfParking);
    setNumberOrderValue(rnd());
    console.log(userID, parkingId, fullDateTimeArrival, fullDateTimeDeparture, numberAuto, theCostOfParking);
  }, []);

  return (
    <div className='wrapPagePay'>
      <h1 className='title'>Страница оплаты</h1>
      <p>Заказ № {numberOrderValue}</p>
      <p>Парковочное место № А1 1 Этаж</p>
      <div className="wrapBtn">
        <button className='btn' onClick={() => payBronParking()}>Оплатить</button>
        <button className='btn' onClick={() => backMainPage()}>Отменить</button>
      </div>
      <MyModal visible={modal} setVisible={setModal}>
        <div>
          <p>Вы успешно оплатили</p>
        </div>
        <button className='btn' onClick={() => backMainPage()}>
          Перейти на главную страницу
        </button>
      </MyModal>
    </div>
  );
}

export { PagePay };
