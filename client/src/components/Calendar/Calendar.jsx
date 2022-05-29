/* eslint-disable react/jsx-no-undef */
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useDispatch } from 'react-redux';
import { setDateArrival, setDateDeparture } from '../../redux/dateReducer';
import {Slider} from '@mui/material';
import { createTheme, ThemeProvider  } from '@mui/material/styles';
import './Calendar.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5766ec',
    },
  },
});

const CustomCalendar = (props) => {
  const toDay = new Date();
  const [error, setError] = useState(false);
  const [dateValue, setDateValue] = useState(new Date());
  const [hours, setHours] = useState(18);
  const [minute, setMinute] = useState(42);
  const dispatch = useDispatch();

  const getMessageError = () =>{
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 1500)
  }

  const closeModalArrival = () => {
    if(dateValue >= toDay || dateValue.toDateString() === toDay.toDateString()) {
      props.setModal(false);
      if(props.getType === 'modalArrival') {
        dispatch(setDateArrival({newDate: dateValue, newTime: hours+":"+minute, id: props.getIdCard}));
      }
    } else {
      getMessageError();
    }
  }

  const closeModalDeparture = () => {
    if(dateValue >= toDay || dateValue.toDateString() === toDay.toDateString()) {
      props.setModal(false);
      if(props.getType === 'modalDeparture') {
        dispatch(setDateDeparture({newDate: dateValue, newTime: hours+":"+minute, id: props.getIdCard}));
      }
    } else {
      getMessageError();
    }
  }

  const handleSliderChangeHours = (event, newValue) => {
      if(newValue < 10) {
        setHours('0'+newValue);
      } else {
        setHours(newValue);
      }
  };

  const handleSliderChangeMinute = (event, newValue) => {
      if(newValue < 10) {
        setMinute('0'+newValue);
      } else {
        setMinute(newValue);
      }
  };
  
  return (
    <div className='calendar'>
      <h1 className='text-center' style={{fontSize: 32}}>{props.getText}</h1>
      <div className='calendar-container'>
        <Calendar onChange={setDateValue} value={dateValue} />
      </div>
      {
        error && <div>Нельзя выбрать дату меньше текущей</div>
      }
      <div className='wrapTime'>
        <div className='bodyTime'>
          <span>{hours}</span>
          <span>:</span>
          <span>{minute}</span>
        </div>
        <div className='wrapSlider'>
        <ThemeProvider theme={theme}>
          <Slider
            value={hours}
            defaultValue={hours}
            onChange={handleSliderChangeHours}
            aria-labelledby="input-slider"
            min={0}
            max={23}
            step={1}
          />
          <Slider 
            value={minute}
            defaultValue={minute}
            onChange={handleSliderChangeMinute}
            aria-labelledby="input-slider"
            min={0}
            max={59}
            step={15}
          />
        </ThemeProvider>
        </div>
      </div>
      {
        props.getType === 'modalArrival' ?
        <button className='button' onClick={() => closeModalArrival()}>Сохранить</button>
        :
        <button className='button' onClick={() => closeModalDeparture()}>Сохранить</button>
      }
    </div>
  );
}

export {CustomCalendar};
