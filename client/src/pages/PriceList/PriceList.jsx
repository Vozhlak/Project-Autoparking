import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PriceList.module.scss';
import icoChargeAuto from '../../assets/istockphoto.jpg'
import icoCarFencing from '../../assets/35889-fence-for-horses-jumps.png';
import icoWashCars from '../../assets/carsWash.jpg'

const PriceList = () => {
  return (
    <div className={styles.wrapPriceList}>
      <h1 className={styles.title}>Прайс лист</h1>
      <div className={styles.wrapPriceListBody}>
        <p>В нашем парковочном центре, созданы комфортные условия для парковки ваших авто.</p>
        <p>На странице <Link to='/'>плана парковки</Link> можно выбрать дату и время, произойдёт расчёт стоимости.</p>
        <p>Или вы можете просто нажать кнопку оплатить, стоимость за бронирования парковочного места на сутки стоит по умолчанию.</p>
        <p>Вы можете воспользоваться следующими дополнительными услугами нашего центра:</p>
        <div className={styles.wrapUslugi}>
          <div className={styles.itemUslugi}>
            <img src={icoChargeAuto} alt="icoChargeAuto" className={styles.icoUslug}/>
            <p>В центре можно воспользоваться зарядкой для электромобилей.</p>
          </div>
          <div className={styles.itemUslugi}>
            <img src={icoCarFencing} alt="icoChargeAuto" className={styles.icoUslug}/>
            <p>Можно воспользоваться ограждением, для большей защиты автомобиля.</p>
          </div>
          <div className={styles.itemUslugi}>
            <img src={icoWashCars} alt="icoChargeAuto" className={styles.icoUslug}/>
            <p>Имеется возможность заказать мойку своего автомобиля.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export { PriceList };
