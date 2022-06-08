const SET_PAY = 'SET_PAY';
const RESET_PAY = 'RESET_PAY';
const SET_BILLID = 'SET_BILLID';
const SET_DATA_PAY_QIWI = 'SET_DATA_PAY_QIWI';
const GET_DATA_PAY_QIWI = 'GET_DATA_PAY_QIWI';

const defaultState = {
  currentPay: {}
}

export const payReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_PAY:
      return {
        ...state,
        currentPay: action.payload.currentPay,
      }
    case SET_DATA_PAY_QIWI:
      return {
        ...state,
        currentPayClient: action.payload.currentPayClient,
      }
    case GET_DATA_PAY_QIWI:
      return {
        ...state,
        PaymentConfirmationClient: action.payload.PaymentConfirmationClient,
      }
    case SET_BILLID:
      return {
        ...state,
        billid: action.payload.billid
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
export const setBillId = (billid) => ({type: SET_BILLID, payload: billid});
export const setDataPayQiwi = (dataPayClient) => ({type: SET_DATA_PAY_QIWI, payload: dataPayClient});
export const getDataPayQiwi = (dataPayClient) => ({type: GET_DATA_PAY_QIWI, payload: dataPayClient});
export const resetPay = () => ({type: resetPay});