import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import Logo from '../../assets/Logo.png';
import styles from './Header.module.scss';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/userReducer';
import { check } from '../../actions/actionUser';


const Header = () => {
  const [logout1, setLogout1] = useState(false);
  const isAuth = useSelector(state => state.user.isAuth);
  const {email} = useSelector(state => state.user.currentUser)

  const nameUser = email ? email : 'UserName';
  const dispatch = useDispatch();

  const navigate = useNavigate();

  function logouted() {
    dispatch(logout());
    navigate('/login');
  }

  return (
    <header className={styles.header}>
      {isAuth ?
        <>
          <div>
            <NavLink to='/'><img className={styles.logo} src={Logo} alt="Logo"/></NavLink>
            <NavLink to='/' className={styles.navLink}>План парковки</NavLink>
            <NavLink to='/PriceList' className={styles.navLink}>Прайс-лист</NavLink>
            <NavLink to='/StoryParkingReservations' className={styles.navLink}>История бронирований</NavLink>
          </div>
          <div>
            <span style={{marginRight: 20}}>{nameUser}</span>
            <button className={`${styles.navBtn} ${styles.navBtn_signUp}`} onClick={() => logouted()}>Выйти</button>
          </div>
        </>
        :
        <>
          <div>
            <NavLink to='/'><img className={styles.logo} src={Logo} alt="Logo"/></NavLink>
            <NavLink to='/' className={`${styles.navLink}`}>План парковки</NavLink>
            <NavLink to='/PriceList' className={styles.navLink}>Прайс-лист</NavLink>
          </div>
          <div>
            <NavLink to='/login' className={`${styles.navBtn} ${styles.navBtn_sigIn}`}>Войти</NavLink>
            <NavLink to='/registration' className={`${styles.navBtn} ${styles.navBtn_signUp}`}>Создать аккаунт</NavLink>
          </div>
        </>
      }
    </header>
  );
}

export { Header };
