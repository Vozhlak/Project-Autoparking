import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import styles from './MainPage.module.scss';
import { Carousel } from 'react-bootstrap';
import { getAuthParking, getParkingReservations, setisUsed } from '../../actions/actionParking';
import { CardCar } from '../../components/CardCar/CardCar';
import MyLoader from '../../components/Loader/MyLoader';
import Modal from '../../components/Modal/MyModal';
import { CustomCalendar as Calendar } from '../../components/Calendar/Calendar';
import { useDispatch, useSelector } from 'react-redux';
import { setPay } from '../../redux/payReducer';

const MainPage = () => {
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [textModal, setTextModal] = useState('');
  const [typeModal, setTypeModal] = useState('');
  const [numberAuto, setNumberAuto] = useState('');
  const [idCard, setIdCard] = useState(null);
  const [dateArrival, setDateArrival] = useState('');
  const [dateDeparture, setDateDeparture] = useState('');
  const [timeArrival, setTimeArrival] = useState('');
  const [timeDeparture, setTimeDeparture] = useState('');
  const [noDateFormatesArrival, setNoDateFormatesArrival] = useState('');
  const [noDateFormatedDeparture, setNoDateFormatedDeparture] = useState('');
  const [parkingName, setParkingName] = useState('');
  const [parkingFloor, setParkingFloor] = useState('');
  const [costBookingParking, setCostBookingParking] = useState('');
  const [error, setError] = useState(false);
  let navigate = useNavigate();
  
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.currentUser)
  const isAuth = useSelector(state => state.user.isAuth);
  const userParking = useSelector(state => state.parking);

  const visibleModal = (id, text, type) => {
    setModal(true);
    setTextModal(text);
    setTypeModal(type);
    setIdCard(id);
  }

  const visibleModalDelete = (id, type) => {
    console.log(id);
    console.log(userParking);
    setModal(true);
    setTypeModal(type); 
    setIdCard(id);
  }

  const visibleModalPayBron = (id, type, {dateArrival, dateDeparture, dateNoFormatArrival, dateNoFormatDeparture, timeArrival, timeDeparture, nameParking, parkingFloor}) => {
    console.log(id);
    console.log(userParking);
    setModal(true);
    setTypeModal(type); 
    setIdCard(id);
    setNoDateFormatesArrival(dateNoFormatArrival);
    setNoDateFormatedDeparture(dateNoFormatDeparture)
    setDateArrival(dateArrival);
    setDateDeparture(dateDeparture);
    setTimeArrival(timeArrival);
    setTimeDeparture(timeDeparture);
    setParkingName(nameParking);
    setParkingFloor(parkingFloor);
    setCostBookingParking('1455');
  }

  const resetStateNumberAuto = () => {
    setModal(false);
    setNumberAuto('');
  }

  const handleChangeNumberAuto = (event) => {
    const numberValue = event.target.value;
    setNumberAuto(numberValue);
    if(error) {
      setError(false);
    }
  }

  useEffect(() => {
    dispatch(getAuthParking(user.id));
    dispatch(getParkingReservations(user.id));
    setIsLoading(false);
  }, []);
  
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const bookingPayment = (userId, ParkingId, timeArrival, timeDeparture, numberAuto, theCostOfParking) => {
    if(userId && ParkingId && timeArrival && timeDeparture && numberAuto && theCostOfParking) {
      const dateArrival = new Date(noDateFormatesArrival).toDateString();
      const dateDeparture = new Date(noDateFormatedDeparture).toDateString();
      const fullDateTimeArrival = dateArrival+" "+timeArrival;
      const fullDateTimeDeparture = dateDeparture+" "+timeDeparture;
      dispatch(setPay({currentPay: {
        userId,
        ParkingId,
        fullDateTimeArrival,
        fullDateTimeDeparture,
        numberAuto,
        theCostOfParking
      }}));
      navigate('/pay');
    } else {
      setError(true);
    }
  }

  return (
    <>
      <div className={styles.mainPage} style={{textAlign: 'center'}}>      
        <h1>План парковки</h1>
        <Carousel activeIndex={index} onSelect={handleSelect} style={{height: 825}} pause={'hover'} interval={null}>
          <Carousel.Item intervel={false}>
            <h2 style={{marginBottom: 20, marginTop: 20}}>1 этаж</h2>
              <div className={styles.wrapperWidgetPlanParking1}>
              {isLoading
              ? 
              <MyLoader/>
              :
              <>
                {isAuth &&
                  userParking.getAuthParking && userParking.getAuthParking.map(p =>
                  <div className={styles.wrap__cars} key={p.id}>
                    <CardCar props={p} modalVisible={visibleModal} modalPayVisible={visibleModalPayBron} modalDeleteVisible={visibleModalDelete}/>
                  </div>)
                }
              </>
              }
              </div>
          </Carousel.Item>
          <Carousel.Item>
            <h2 style={{marginBottom: 20, marginTop: 20}}>2 этаж</h2>
            <div className={styles.wrapperWidgetPlanParking2}>
            {isLoading
              ? 
              <MyLoader/>
              :
              <>
                {isAuth &&
                  userParking.getAuthParking1 && userParking.getAuthParking1.map(p =>
                  <div className={styles.wrap__cars} key={p.id}>
                    <CardCar props={p} modalVisible={visibleModal} modalPayVisible={visibleModalPayBron} modalDeleteVisible={visibleModalDelete}/>
                  </div>)
                }
              </>
              }
            </div>
          </Carousel.Item>
        </Carousel>
        {typeModal === "DeleteBron" ?
          <Modal visible={modal} setVisible={setModal}>
            <h1>Отмена брони</h1>
            <p>Вы действительно хотите отменить бронь парковки</p>
            <p>В случае отмены брони, деньги вам не будут возвращены</p>
            <div className={styles.wrapBtn}>
              <button className={styles.button}>Да</button>
              <button className={styles.button} onClick={() => setModal(false)}>Нет</button>
            </div>
          </Modal>
          :
        typeModal === "PayParkingBron" ?
          <Modal visible={modal} setVisible={setModal}>
            <h1>Бронирование <br /> парковки</h1>
            <div style={{display: 'flex', flexDirection: 'column', marginTop: 15}}>
            <div className={styles.bodyPayBron}>
            <div className={styles.wrapperDataParking}>
              <div className={styles.wrap__mestoParkingInfo}>
                <span>Дата и время прибытия:</span>
                <div className={styles.mestoParkingInfo__bodyDateTime}>
                  <div>
                    <span className={styles.mestoParkingInfo__calendar} style={{fontWeight: 500}}>{dateArrival}</span>
                  </div>
                  <div>
                    <span className={styles.mestoParkingInfo__clock} style={{fontWeight: 500}}>{timeArrival}</span>
                  </div>
                </div>
              </div>
              <div className={styles.wrap__mestoParkingInfo}>
                <span>Дата и время отъезда:</span>
                <div className={styles.mestoParkingInfo__bodyDateTime}>
                  <div>
                    <span className={styles.mestoParkingInfo__calendar} style={{fontWeight: 500}}>{dateDeparture}</span>
                  </div>
                  <div>
                    <span className={styles.mestoParkingInfo__clock} style={{fontWeight: 500}}>{timeDeparture}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.wrap__mestoParkingInfo} style={{display: 'flex', marginTop: 10, marginLeft: 0, justifyContent: 'center'}}>
              <span style={{fontSize: 16}}>Этаж: <span style={{fontWeight: 500}}>{parkingFloor}</span> Место парковки: <span style={{fontWeight: 500}}>{parkingName}</span></span>
            </div>
            <div className={styles.wrap__mestoParkingInfo} style={{display: 'flex', marginTop: 10, marginLeft: 0, justifyContent: 'center'}}>
              <span>Итого к оплате: <span style={{fontWeight: 500}}>1240 ₽</span></span>
            </div>
            </div>
              <span style={{fontSize: 20, margin: '10px 0'}}>Введите номер автомобиля</span>
              <input
                value={numberAuto}
                onChange={e => handleChangeNumberAuto(e)}
                className={`${styles.input}`}
                style={{marginBottom: 0, fontSize: 28, fontWeight: 700, textAlign: 'center', paddingLeft: 28}}
                placeholder='o111oo'
                maxLength={6}
              />
              {error && <div style={{color: 'red'}}>Поле для ввода не может быть пустым</div>}
            </div>
            <div className={styles.wrapBtn}>
              <button className={styles.button} onClick={() => bookingPayment(user.id, idCard, timeArrival, timeDeparture, numberAuto, costBookingParking)}>Перейти к оплате</button>
              <button className={styles.button} onClick={() => resetStateNumberAuto()}>Отмена</button>
            </div>
          </Modal>
          :
          <Modal visible={modal} setVisible={setModal}>
            <Calendar setModal={setModal} getText={textModal} getType={typeModal} getIdCard={idCard}/>
          </Modal>
        }
      </div>
    </>
  );
}

export {MainPage};
