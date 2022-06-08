import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './CardCar.module.scss';
import { Card } from 'react-bootstrap';
import parkingA1 from '../../assets/ParkingA149939-170667a.jpg';
import { convertLength } from '@mui/material/styles/cssUtils';

const CardCar = (props) => {
  const [dateArrival, setDateArrival] = useState('');
  const [dateDeparture, setDateDeparture] = useState('');
  const [dateNoFormatArrival, setDateNoFormatArrival] = useState('');
  const [dateNoFormatDeparture, setDateNoFormatDeparture] = useState('');
  const [timeNoFormatarrival, setTimeNoFormatarrival] = useState('');
  const [timeNoFormatDeparture, setTimeNoFormatDeparture] = useState('');
  const [timeArrival, setTimeArrival] = useState('');
  const [timeDeparture, setTimeDeparture] = useState('');
  const [text, setText] = useState('Парковочное место №');
  const [cost, setCost] = useState('Парковочное место №');
  const [textBtn, setTextBtn] = useState('Оплатить');
  const [typeBtn, setTypeBtn] = useState('PayBtn');
  const [type, setType] = useState('');
  const [dataVisible, setDataVisible] = useState(false);
  const [visiblePanelPay, setVisiblePanelPay] = useState(false);
  const userID = useSelector(state => state.user.currentUser.id);
  const dates = useSelector(state => state.date);
  const [user, setUser] = useState(null);
  
  const [isUsedParking, setIsUsedParking] = useState(props.props.isUsed);

  const st = () => {
    if(props.props.ParkingReservations.length === 0) {
      setText('Парковочное место №');
      setDataVisible(true);
      setVisiblePanelPay(true);
      setTextBtn('Оплатить');
      setDateArrival(getFormatDate(dates.dateAndtimeArrival));
      setDateDeparture(getFormatDate(dates.dateAndtimeDeparture));
      setTimeArrival(getFormatTime(new Date().getTime()));
      setTimeDeparture(getFormatTime(new Date().getTime()));
      setDateNoFormatArrival(dates.dateAndtimeArrival);
      setDateNoFormatDeparture(dates.dateAndtimeDeparture);
      setCost('1')
      setTypeBtn('payBtn');
    } else {
      if(props.props.ParkingReservations.length > 0 && props.props.ParkingReservations[0].UserId === userID) {
        setText('Ваше парковочное место №');
        setDataVisible(true);
        setTypeBtn('deleteBronBtn')
        setUser(props.props.ParkingReservations[0].UserId);
        setDateArrival(getFormatDate(props.props.ParkingReservations[0].dateAndTimeOfArrival));
        setDateDeparture(getFormatDate(props.props.ParkingReservations[0].dateAndTimeOfDeparture));
        setTimeArrival(getFormatTime(props.props.ParkingReservations[0].dateAndTimeOfArrival));
        setTimeDeparture(getFormatTime(props.props.ParkingReservations[0].dateAndTimeOfDeparture));
        setDateNoFormatArrival(props.props.ParkingReservations[0].dateAndTimeOfArrival);
        setDateNoFormatDeparture(props.props.ParkingReservations[0].dateAndTimeOfDeparture);
        setCost(props.props.ParkingReservations[0].theCostOfParking)
        if(user) {
          setVisiblePanelPay(false);
        }
      }
    }
  }

  function getFormatDate(nowDate) {
    const newDate = new Date(nowDate);
    const days = ["Вс,", "Пн,", "Вт,", "Ср,", "Чт,", "Пт,", "Сб,"]
    const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабрь'];
    const dateMonth = newDate.getDate();
    const dayWeek = days[newDate.getDay()];
    const month = months[newDate.getMonth()];
    const formatedDate = dayWeek+' '+dateMonth+' '+month;
    return formatedDate;
  }

  function getFormatTime(time) {
    const newTime = new Date(time);
    let hours = ''
    let minutes = '';
    if(newTime.getHours() <= 10) {
      hours = '0'+newTime.getHours();
    } else {
      hours = newTime.getHours();
    }
    if(newTime.getMinutes() < 10) {
      minutes = '0'+newTime.getMinutes();
    } else {
      minutes = newTime.getMinutes();
    }
    const formatedTime = hours+":"+minutes;
    return formatedTime;
  }

  const getModal = (id, text, type) => {
    props.modalVisible(id, text, type);
  }

  const getUpdateDateArrival = (updateDate, id) => {
    if(props.props.id === id) {
      const shortDateArrival = new Date(updateDate);
      setDateNoFormatArrival(shortDateArrival);
      setDateArrival(getFormatDate(shortDateArrival));
    }
  }
  const getUpdateTimeArrival = (updateTime, id) => {
    if(props.props.id === id) {
      setTimeNoFormatarrival(updateTime);
      setTimeArrival(updateTime);
    }
  }
  const getUpdateDateDeparture = (updateDate, id) => {
    if(props.props.id === id) {
      setDateNoFormatDeparture(updateDate);
      setDateDeparture(getFormatDate(updateDate));
      setTextBtn("Оплатить");
      setType("Pay");
      setVisiblePanelPay(true);
    }
  }
  const getUpdateTimeDeparture = (updateTime, id) => {
    if(props.props.id === id) {
      setTimeNoFormatDeparture(updateTime);
      setTimeDeparture(updateTime);
      setTextBtn("Оплатить");
      setType("Pay");
      setVisiblePanelPay(true);
    }
  }

  const UpdateDataParking = (id) => {
    if(props.props.ParkingReservations[0].id === id) {
      props.modalDeleteVisible(id, "DeleteBron");
      console.log(props);
    } else {
      console.log(false);
    }
  }

  const PayParking = (id) => {
    if(props.props.id === id) {
      props.modalPayVisible(id, "PayParkingBron", {dateArrival: dateArrival, dateNoFormatArrival: dateNoFormatArrival,
        dateDeparture: dateDeparture, dateNoFormatDeparture: dateNoFormatDeparture,
        timeArrival: timeArrival, timeDeparture: timeDeparture, nameParking: props.props.nameParking,
        parkingFloor: props.props.ParkingFloorId, costParking: cost});
      console.log(props)
    } else {
      console.log(false);
    }
  }


  const calculateCostParking = (dateStart, dateEnd) => {
    const diff = Date.parse( dateEnd ) - Date.parse( dateStart );
    return isNaN( diff ) ? NaN : {
        diff : diff,
        ms : Math.floor( diff            % 1000 ),
        s  : Math.floor( diff /     1000 %   60 ),
        m  : Math.floor( diff /    60000 %   60 ),
        h  : Math.floor( diff /  3600000 %   24 ),
        d  : Math.floor( diff / 86400000        )
    };
  }
  
  useEffect(() => {
    st();
    if(dates.newDateArrival !== undefined || dates.newDateArrival !== null) {
      getUpdateDateArrival(dates.newDateArrival, dates.idArrival);
    }
    if(dates.newTimeArrival !== undefined || dates.newTimeArrival !== null) {
      getUpdateTimeArrival(dates.newTimeArrival, dates.idArrival);
    }
    if(dates.newDateDeparture !== undefined || dates.newDateDeparture !== null) {
      getUpdateDateDeparture(dates.newDateDeparture, dates.idDeparture);
    }
    if(dates.newTimeDeparture !== undefined || dates.newTimeDeparture !== null) {
      getUpdateTimeDeparture(dates.newTimeDeparture, dates.idDeparture);
    }
    setIsUsedParking(props.props.isUsed);
  }, [dates, props.props.isUsed]);

  return (
    <div className={`${styles.wrap__cars}`}>
      <div className={`${styles.cars} ${props.props.id > 5 && props.props.id <= 10 ? styles.carsRotate : ''}
        ${props.props.id > 10 && props.props.id <= 15 ? styles.carsRotate1 : ''} ${props.props.id > 15 && props.props.id <= 20 ? styles.carsRotate2 : ''}`}>
        <span className={`${(props.props.id > 5 && props.props.id <= 10) || (props.props.id > 15 && props.props.id <= 20) ? `${styles.carsRotate} ${styles.nameParkingRotate}` : ''}`}>{props.props.nameParking}</span>
      </div>
      <Card className={`${styles.card} ${(props.props.id > 5 && props.props.id <= 10) || (props.props.id > 15 && props.props.id <= 20) ? styles.cardRotate : ''}`}>
        <Card.Img variant="top" src={parkingA1} height={180} width={180}/>
        <Card.Body>
              {!props.props.isUsed ?
              <div>
                <Card.Title style={{fontSize: 16}}>
                  {text} {props.props.nameParking}
                </Card.Title>
                <Card.Text>
                  <div>
                    <div className={styles.wrap__mestoParkingInfo} onClick={() => getModal(props.props.id,'Выберите дату прибытия', 'modalArrival')}>
                      <span>Прибытие</span>
                      <div className={styles.mestoParkingInfo__bodyDateTime}>
                        <div>
                          <span className={styles.mestoParkingInfo__calendar}>{dateArrival}</span>
                        </div>
                        <div>
                          <span className={styles.mestoParkingInfo__clock}>{timeArrival}</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.wrap__mestoParkingInfo} onClick={() => getModal(props.props.id, 'Выберите дату отъезда', 'modalDeparture')}>
                      <span>Отъезд</span>
                      <div className={styles.mestoParkingInfo__bodyDateTime}>
                        <div>
                          <span className={styles.mestoParkingInfo__calendar}>{dateDeparture}</span>
                        </div>
                        <div>
                          <span className={styles.mestoParkingInfo__clock}>{timeDeparture}</span>
                        </div>
                      </div>
                    </div>
                    {visiblePanelPay &&
                      <div className={styles.body_payment_for_parking}>
                        Итого к оплате: 
                        <span style={{fontSize: 16, fontWeight: 500, paddingLeft: 10}}>{cost}.00 </span>
                        ₽ 
                      </div>
                    }
                      <button className={styles.button} onClick={() => PayParking(props.props.id)}>Оплатить</button>
                  </div>
                </Card.Text>
              </div>
                :
                props.props.isUsed &&
                props.props.ParkingReservations.length > 0 &&
                props.props.ParkingReservations[0].ParkingId === props.props.id &&
                props.props.ParkingReservations[0].UserId && props.props.ParkingReservations[0].UserId === userID ?
                <div>
                  <Card.Title style={{fontSize: 16}}>
                    Ваше парковочное место № {props.props.nameParking}
                  </Card.Title>
                  <Card.Text>
                    <div>
                      <div className={styles.wrap__mestoParkingInfo} onClick={() => getModal(props.props.id, 'Выберите дату отъезда', 'modalDeparture')}>
                        <span>Отъезд</span>
                        <div className={styles.mestoParkingInfo__bodyDateTime}>
                          <div>
                            <span className={styles.mestoParkingInfo__calendar}>{dateDeparture}</span>
                          </div>
                          <div>
                            <span className={styles.mestoParkingInfo__clock}>{timeDeparture}</span>
                          </div>
                        </div>
                      </div>
                      {visiblePanelPay &&
                        <div className={styles.body_payment_for_parking}>
                          Итого к оплате: 
                          <span style={{fontSize: 16, fontWeight: 500, paddingLeft: 10}}>{cost}.00 </span>
                          ₽ 
                        </div>
                      }
                        <button className={styles.button} onClick={() => UpdateDataParking(props.props.ParkingReservations[0].id)}>Отменить бронь</button>
                    </div>
                  </Card.Text>
                </div>
                :
                <div>
                  <Card.Title style={{fontSize: 16}}>
                    {text} {props.props.nameParking}
                  </Card.Title>
                  <Card.Text>
                    <div className={`${styles.wrap__mestoParkingInfo} ${styles.cardMessage}`}>
                      <p>Место занято</p>
                      <p>{props.props.ParkingReservations.ParkingId}</p>
                    </div>
                  </Card.Text>
                </div>
              }
        </Card.Body>
      </Card>
    </div>
  );
}

export { CardCar };
