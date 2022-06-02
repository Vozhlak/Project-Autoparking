const SET_PAY = 'SET_PAY';
const RESET_PAY = 'RESET_PAY';

const defaultState = {
  currentPay: {},
  isUsed: false
}

export const payReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_PAY:
      return {
        ...state,
        currentPay: action.payload.currentPay,
      }
    case RESET_PAY:
      return {
        ...state,
        currentPay: {},
      }
    default:
      return state;
  }
}

export const setPay = (dataPay) => ({type: SET_PAY, payload: dataPay});
export const resetPay = () => ({type: resetPay})