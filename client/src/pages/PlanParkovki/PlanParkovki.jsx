import React, { useState, useEffect } from 'react';
import styles from './PlanParkovki.module.scss';
import { Carousel } from 'react-bootstrap';
import { getParking } from '../../actions/actionParking';
import MyLoader from '../../components/Loader/MyLoader';
import { useDispatch, useSelector } from 'react-redux';

const PlanParkovki = () => {
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const parking = useSelector(state => state.parking);
  const isAuth = useSelector(state => state.user.isAuth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getParking());
    setIsLoading(!isLoading);
  }, []);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
      <div className={styles.planParkovki} style={{textAlign: 'center'}}>      
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
              {!isAuth &&
                parking.getParkingA && parking.getParkingA.map(p =>
                <div className={styles.wrap__cars} key={p.id}>
                  <div className={`${styles.cars} ${p.id > 5 && p.id <= 10 ? styles.carsRotate : ''}
                    ${p.id > 10 && p.id <= 15 ? styles.carsRotate1 : ''} ${p.id > 15 && p.id <= 20 ? styles.carsRotate2 : ''}`}>
                    <span className={`${(p.id > 5 && p.id <= 10) || (p.id > 15 && p.id <= 20) ? `${styles.carsRotate} ${styles.nameParkingRotate}` : ''}`}>{p.nameParking}</span>
                  </div> 
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
              {!isAuth &&
                parking.getParkingB && parking.getParkingB.map(p =>
                <div className={styles.wrap__cars} key={p.id}>
                  <div className={`${styles.cars} ${p.id > 5 && p.id <= 10 ? styles.carsRotate : ''}
                    ${p.id > 10 && p.id <= 15 ? styles.carsRotate1 : ''} ${p.id > 15 && p.id <= 20 ? styles.carsRotate2 : ''}`}>
                    <span className={`${(p.id > 5 && p.id <= 10) || (p.id > 15 && p.id <= 20) ? `${styles.carsRotate} ${styles.nameParkingRotate}` : ''}`}>{p.nameParking}</span>
                  </div>
                </div>)
              }
              </>
              }
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
  );
}

export { PlanParkovki };
