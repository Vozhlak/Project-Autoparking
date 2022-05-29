const SET_PARKING = 'SET_PARKING';
const SET_AUTH_PARKING = 'SET_AUTH_PARKING';
const CREATE_PARKING_RESERVATIONS = 'CREATE_PARKING_RESERVATIONS';
const SET_IsUSED = 'SET_IsUSED';

const defaultState = {
  currentParking: {},
  isUsed: false
}

export const parkingReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_PARKING:
      return {
        ...state,
        getParkingA: action.payload.parkingA,
        getParkingB: action.payload.parkingB,
      }
    case SET_AUTH_PARKING:
      return {
        ...state,
        getAuthParking: action.payload.userParking,
        getAuthParking1: action.payload.userParking1,
      }
    case CREATE_PARKING_RESERVATIONS:
      return {
        ...state,
        createParkingReservations: action.payload.userParking,
      }
    case SET_IsUSED:
      return {
        ...state,
        currentParking: action.payload.parking,
        isUsed: true
      }
    default:
      return state;
  }
}

export const setParking = (parking) => ({type: SET_PARKING, payload: parking});
export const setAuthParking = (userParking) => ({type: SET_AUTH_PARKING, payload: userParking});
export const setIsUsedParking = (parking) => ({type: SET_IsUSED, payload: parking});
export const createParkingReservations = (userParking) => ({type: CREATE_PARKING_RESERVATIONS, payload: userParking});