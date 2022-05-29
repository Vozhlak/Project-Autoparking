import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import styles from './Autorization.module.scss';

const RestoreAccess = () => {
  return (
    <div className={styles.wpar__login}>
      <div className={styles.wrap__form}>
        <h2 className={styles.form__title}>Восстановление пароля</h2>
        <p>Введите email, на который мы вышлем ссылку для сброса пароля</p>
        <input type="text" placeholder='Введите Email' className={`${styles.input} ${styles.email}`} />
        <button className={styles.button_signIn}>Продолжить</button>
        <div className={styles.link_not_acc}><Link to='/login' className={styles.links}>Нет, спасибо</Link></div>
      </div>
    </div>
  );
}

export {RestoreAccess};
