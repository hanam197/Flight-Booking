import {
  TRANSACTION_CREATE_REQUEST,
  TRANSACTION_CREATE_SUCCESS,
  TRANSACTION_CREATE_FAIL,
  TRANSACTION_DETAILS_REQUEST,
  TRANSACTION_DETAILS_SUCCESS,
  TRANSACTION_DETAILS_FAIL,
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case TRANSACTION_CREATE_REQUEST:
      return { loading: true };
    case TRANSACTION_CREATE_SUCCESS:
      return { loading: false, success: true, transaction: action.payload };
    case TRANSACTION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case TRANSACTION_DETAILS_REQUEST:
      return { loading: true, ...state }; // Giữ nguyên trạng thái hiện tại khi yêu cầu thông tin giao dịch
    case TRANSACTION_DETAILS_SUCCESS:
      return { loading: false, transaction: action.payload };
    case TRANSACTION_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
