import React from 'react';
import Logo from '../../assets/Logo.png';
import styles from './Footer.module.scss';


const Footer = () => {
  return (
    <div className={styles.wrapFooter}>
      <div className={styles.borderLineWrap}>
        <img className={styles.logo} src={Logo} alt="Logo"/>
        <p>Проект автопаркинг 2022 - Все права защищены</p>
      </div>
    </div>
  );
}

export { Footer };
