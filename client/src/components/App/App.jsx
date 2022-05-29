import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { NotFound } from '../../pages/NotFound';
import { MainPage } from '../../pages/MainPage/MainPage';
import { Header } from '../Header/Header';
import { Login } from '../../pages/Autorization/Login';
import { Registration } from '../../pages/Autorization/Registration';
import { RestoreAccess } from '../../pages/Autorization/RestoreAccess';
import { PlanParkovki } from '../../pages/PlanParkovki/PlanParkovki'
import { check } from '../../actions/actionUser';
import MyLoader from '../Loader/MyLoader';
import { PriceList } from '../../pages/PriceList/PriceList';
import { StoryParkingReservations } from '../../pages/StoryParkingReservations/StoryParkingReservations';

const App = () => {
  const isAuth = useSelector(state => state.user.isAuth);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()

  useEffect(() => {
    setLoading(loading);
    dispatch(check());
    setLoading(!loading);
  }, [])

  return (
    <div className="App">
      <Header/>
        {
          loading ? <MyLoader/>
          :
          <Routes>
            {isAuth && <Route index element={<MainPage />} />}
            {isAuth && <Route path='/' element={<MainPage />} />}
            {!isAuth && <Route path="/" element={<PlanParkovki />} />}
            {isAuth && <Route path='/login' element={<Navigate to="/" />} />}
            {isAuth && <Route path='/registration' element={<Navigate to="/" />} />}
            {isAuth && <Route path='/StoryParkingReservations' element={<StoryParkingReservations />} />}
            {!isAuth && <Route path='/StoryParkingReservations' element={<Navigate to="/" />} />}
            {isAuth && <Route path='/restore-access' element={<Navigate to="/" />} />}
            <Route path='/login' element={<Login />} />
            <Route path='/registration' element={<Registration />} />
            <Route path='/restore-access' element={<RestoreAccess />} />
            <Route path='/PriceList' element={<PriceList />} />
            <Route path='/notFound' element={<NotFound />} />
            <Route path='*' element={<Navigate to='notFound' />} />
          </Routes>
        }
    </div>
  );
}

export {App};
