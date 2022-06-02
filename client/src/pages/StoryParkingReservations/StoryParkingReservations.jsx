import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './StoryParkingReservations.module.scss';
import { getParkingReservations } from '../../actions/actionParking';

const StoryParkingReservations = () => {
  const userId = useSelector(state => state.user.currentUser.id);
  const StoryParkingReservations = useSelector(state => state.parking.parking.StoryParkingReservations);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getParkingReservations(userId));
  }, []);

  function getFormatDate(nowDate) {
    const newDate = new Date(nowDate);

    const time = nowDate.substring(11, 16);

    const days = ["Вс,", "Пн,", "Вт,", "Ср,", "Чт,", "Пт,", "Сб,"]
    const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабрь'];
    const dateMonth = newDate.getDate();
    const dayWeek = days[newDate.getDay()];
    const month = months[newDate.getMonth()];
    const formatedDate = dayWeek+' '+dateMonth+' '+month;
    return formatedDate+" "+time;
  }

  return (
    <div className={styles.wrapStoryParkingReservations}>
      <h1 className={styles.title}>История бронирований</h1>
      {StoryParkingReservations.length === 0 ?
        <div className={styles.wrapList} style={{background: 'rgb(231, 239, 255)', textAlign: 'center'}}>
          <p style={{fontSize: 35, border: '2px solid rgb(87, 102, 236)', borderRadius: '4px', padding: '5px 10px'}}>Историй бронирований нет</p>
        </div>
        :
        <div className={styles.wrapList}>
          <div className={styles.wrapHeaderList}>
            <ul className={styles.headerList}>
              <li className={styles.headerItem}>№</li>
              <li className={styles.headerItem}>Дата и <br /> время прибытия</li>
              <li className={styles.headerItem}>Дата и <br /> время отъезда</li>
              <li className={styles.headerItem}>номер авто</li>
              <li className={styles.headerItem}>Место паркинга</li>
              <li className={styles.headerItem}>Стоимость услуг</li>
            </ul>
          </div>
          <div className={styles.wrapItem}>
          {StoryParkingReservations && StoryParkingReservations.map(storyParking => 
            <div className={styles.listItem} key={storyParking.id}>
              <span className={styles.item}>{storyParking.id}</span>
              <span className={styles.item}>{getFormatDate(storyParking.dateAndTimeOfArrival)}</span>
              <span className={styles.item}>{getFormatDate(storyParking.dateAndTimeOfDeparture)}</span>
              <span className={styles.item}>{storyParking.numberAuto}</span>
              <span className={styles.item}>{storyParking.parking}</span>
              <span className={styles.item}>{storyParking.theCostOfParking} ₽</span>
            </div>
          )}
          </div>
        </div>
      }
    </div>
  );
}

export { StoryParkingReservations };
