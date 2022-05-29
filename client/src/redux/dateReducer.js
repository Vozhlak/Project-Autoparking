const SET_DATE_ARRIVAL = 'SET_DATE_ARRIVAL';
const SET_DATE_DEPARTURE = 'SET_DATE_DEPARTURE';

const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1)

const defaultState = {
  dateAndtimeArrival: today.toDateString(),
  dateAndtimeDeparture: tomorrow.toDateString(),
}

export const dateReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_DATE_ARRIVAL:
      return {
        ...state,
        newDateArrival: action.payload.newDate,
        newTimeArrival: action.payload.newTime,
        idArrival: action.payload.id
      }
    case SET_DATE_DEPARTURE:
      return {
        ...state,
        newDateDeparture: action.payload.newDate,
        newTimeDeparture: action.payload.newTime,
        idDeparture: action.payload.id
      }
    default:
      return state;
  }
}

export const setDateArrival = (date) => ({type: SET_DATE_ARRIVAL, payload: date})
export const setDateDeparture = (date) => ({type: SET_DATE_DEPARTURE, payload: date})
