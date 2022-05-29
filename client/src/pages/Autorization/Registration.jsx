import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import styles from './Autorization.module.scss';
import './Autorization.module.scss';
import InputMask from "react-input-mask";
import  MyModal from '../../components/Modal/MyModal';
import { registration } from '../../actions/actionUser';
import { sendEmail } from '../../actions/actionUser';
import catSmile from '../../assets/cat-face-with-wry-smile-svgrepo-com.svg';

const Registration = () => {
  const [email, setEmail] = useState('');
  const [codeValue, setCodeValue] = useState('');
  const [password, setPassword] = useState('');
  const [password1, setPassword1] = useState('');
  const [error, setError] = useState('');
  const [error1, setError1] = useState('');
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [modal, setModal] = useState(false);

  const [isRegister, setIsRegister] = useState(false)

  const [code, setCode] = useState([]);

  let codeList;

  const handleChangeEmail = (event) => {
    const emailValue = event.target.value;
    setEmail(emailValue);
    setError('');
    if(!emailValue) {
      setError('Поле для ввода не может быть пустым');
    }
  }

  const handleChangeCode = (event) => {
    const codeValue = event.target.value;
    setCodeValue(codeValue);
    setError('');
    if(!codeValue) {
      setError('Поле для ввода не может быть пустым');
    }
  }

  const handleChangePassword = (event) => {
    const passwordValue = event.target.value;
    setPassword(passwordValue);
    setError('');
    if(!passwordValue) {
      setError('Поле для ввода не может быть пустым');
    }
  }

  const handleChangePassword1 = (event) => {
    const passwordValue = event.target.value;
    setPassword1(passwordValue);
    setError1('');
    if(!passwordValue) {
      setError1('Поле для ввода не может быть пустым');
    }
  }

  const click = async() => {
    setModal(true);
    await sendEmail(email)
    .then(res => {
      codeList = res.data;
      setCode([...code, codeList]);
      console.log(codeList);
    })
    .catch(err => {
      if(!codeValue) {
        setError('Поле для ввода не может быть пустым');
      }
      else if(err.response.data.errors) {
        setError(err.response.data.errors[0].msg);
      } else if(err.response.data.type === 'custom') {
        setError(err.response.data.message);
      }
    });
  }

  const btnSendEmail = async() => {
      await sendEmail(email)
      .then(res => {
        codeList = res.data;
        setCode([...code, codeList]);
        console.log(codeList);
        setShow(!show);
        setShow1(!show1);
      })
        .catch(err => {
          if(email === '') {
            setError('Поле для ввода не может быть пустым');
          }
          else if(err.response.data.errors) {
            setError(err.response.data.errors[0].msg);
          } else if(err.response.data.type === 'custom') {
            setError(err.response.data.message);
          }
        });
  }

  const isUsedCode = () => {
    if(code) {
      let lCode;
      code.forEach(m => lCode = m.codeList);
      console.log('lCode', lCode, 'lastCode', lCode[lCode.length - 1]);
      console.log(codeValue);
      if(lCode.includes(codeValue)) {
        if(codeValue === lCode[lCode.length - 1]) {
          setShow1(!show1)
          setShow2(!show2);
        }
        else{
          setError("Этот код доступа устарел.");
        }
      }
      else{
        setError('Введёный вами код не существует');
      }
    }
    if(!codeValue) {
      setError('Поле для ввода не может быть пустым');
    }
  }

  const register = async() => {
    if(password && password1) {
      if(password === password1)
      {
        await registration(email, password)
        .then(res => {
          setModal(true);
          console.log(res.data.message);
        })
        .catch(err => {
          console.log(err.response.data.message);
        })
      }
      else
      {
        setError1('Пароли не совпадают');
      }
    }

    if(!password) {
      setError('Поле для ввода не может быть пустым');
    }
    if(!password1) {
      setError1('Поле для ввода не может быть пустым');
    }
  }

  function redirectToLogin() {
    setModal(false);
    console.log('Login: ', email, 'Password:', password);
    setIsRegister(true);
  }

  return (
    <>
      <div className={styles.wpar__login}>
      {!show &&
        <div className={styles.wrap__form}>
          <h2 className={styles.form__title}>Создать аккаунт</h2>
          <p>Быстрый способ бронирования места парковки</p>
          <input
            type="text" 
            placeholder='Введите Email'
            value={email}
            onChange={(e) => handleChangeEmail(e)}
            className={`${styles.input} ${styles.email}`}
            style={{marginBottom: 0}}
          />
          <div id='er' style={{color: 'red', marginBottom: '1rem'}}>{error}</div>
          <button
          className={styles.button_signIn}
          onClick={() => btnSendEmail(email)}>
            Продолжить
          </button>
          <div className={styles.link_not_acc}>
            У меня уже есть аккаунт.
            <Link to='/login' className={styles.links}> Войти!</Link>
          </div>
        </div>
      }
      {show1 &&
          <div className={styles.wrap__form}>
            <h2 className={styles.form__title}>Создание аккаунта</h2>
            <p>Для дальнейшей регистрации, вам на почту было выслано письмо с кодом доступа</p>
            <InputMask
              value={codeValue}
              onChange={handleChangeCode}
              className={`${styles.input}`}
              style={{marginBottom: 0, fontSize: 28, fontWeight: 700, textAlign: 'center', paddingLeft: 28}}
              mask="999-999"
              placeholder='123456'
              maskPlaceholder={null}
            />
            <div id='er' style={{color: 'red', marginBottom: '1rem'}}>{error}</div>
            <Link to=''
              className={styles.links}
              style={{display: 'block', textAlign: 'center', marginBottom: '1rem'}}
              onClick={() => click(email)}>
              Отправить код повторно.
            </Link>
            <MyModal visible={modal} setVisible={setModal}>
              <img src={catSmile} alt="cat" style={{display: 'block', margin: '0 auto 20px', width: 200, height: 200}}/>
              <p style={{fontSize: 18, }}>Проверьте пожалуйста вашу почту, <br /> вам был повторно выслан код</p>
              <button
                className={styles.button_signIn}
                onClick={() => setModal(false)}>
                  OK
              </button>
            </MyModal>
            <button
            className={styles.button_signIn}
            onClick={() => isUsedCode(code)}>
              Продолжить
            </button>
            <div className={styles.link_not_acc}>
            У меня уже есть аккаунт.
            <Link to='/login' className={styles.links}> Войти!</Link>
            </div>
          </div>
      }
      {show2 &&
          <div className={styles.wrap__form}>
            <h2 className={styles.form__title}>Создание аккаунта</h2>
            <p>Чтобы закончить регистрацию, придумайте пароль</p>
            <input
              type="password"
              placeholder='Введите пароль'
              className={`${styles.input} ${styles.password}`}
              value={password}
              onChange={handleChangePassword}
              style={{marginBottom: 0}}
            />
            <div id='er' style={{color: 'red', marginBottom: '1rem'}}>{error}</div>
            <input
              type="password"
              placeholder='Введите пароль'
              className={`${styles.input} ${styles.password}`}
              value={password1}
              onChange={handleChangePassword1}
              style={{marginBottom: 0}}
            />
            <div id='er' style={{color: 'red', marginBottom: '1rem'}}>{error1}</div>
            <button
            className={styles.button_signIn}
            onClick={() => register()}>
              Продолжить
            </button>
            {isRegister && <Navigate to='/login' replace={true}/>}
            <MyModal visible={modal} setVisible={setModal}>
              <img src={catSmile} alt="cat" style={{display: 'block', margin: '0 auto 20px', width: 200, height: 200}}/>
              <p style={{fontSize: 18, }}>Вы успешно зарегистрировались <br /> и теперь вы можете войти в аккаунт</p>
              <button
                className={styles.button_signIn}
                onClick={() => redirectToLogin()}>
                  Войти
              </button>
            </MyModal>
            <div className={styles.link_not_acc}>
            У меня уже есть аккаунт.
            <Link to='/login' className={styles.links}> Войти!</Link>
            </div>
          </div>}
      </div>
    </>
  );
}

export {Registration};
