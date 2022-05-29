import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import styles from './Autorization.module.scss';
import { login } from '../../actions/actionUser';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [error1, setError1] = useState('');
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  const isAuth = useSelector(state => state.user.isAuth);

  useEffect(() => {
    if(isAuth) {
      setLoading(true);
    }
  }, []);
  
  const dispatch = useDispatch();

  const handleChangeEmail = (event) => {
    const emailValue = event.target.value;
    setEmail(emailValue);
    setError('');
    if(!emailValue) {
      setError('Поле для ввода не может быть пустым');
    }
  }

  const handleChangePassword = (event) => {
    const passwordValue = event.target.value;
    setPassword(passwordValue);
    setError1('');
    if(!passwordValue) {
      setError1('Поле для ввода не может быть пустым');
    }
  }

  const signIn = () => {
    dispatch(login(email, password));
    setIsLogin(!isLogin);
  }

  return (
    <div className={styles.wpar__login}>
      <div className={styles.wrap__form}>
        <h2 className={styles.form__title}>Войти</h2>
        <p>Рады вас снова видеть</p>
        <input
          type="text" placeholder='Введите Email'
          style={{marginBottom: 0}}
          className={`${styles.input} ${styles.email}`}
          value={email}
          onChange={(e) => handleChangeEmail(e)}
        />
        <div id='er' style={{color: 'red', marginBottom: '1rem'}}>{error}</div>
        <input
          type="password"
          placeholder='Введите пароль'
          style={{marginBottom: 0}}
          className={`${styles.input} ${styles.password}`}
          value={password}
          onChange={(e) => handleChangePassword(e)}
        />
        <div id='er' style={{color: 'red', marginBottom: '1rem'}}>{error1}</div>
        <div style={{textAlign: 'right', marginBottom: '1rem'}}><Link to='/restore-access' className={styles.links}>Забыли пароль?</Link></div>
        {isLogin && <Navigate to='/'/>}
        <button className={styles.button_signIn} onClick={() => signIn()}>Войти</button>
        <div className={styles.link_not_acc}>Нет аккаунта? <Link to='/registration' className={styles.links}>Создайте!</Link></div>
      </div> 
    </div>
  );
}

export {Login};
