import { FETCH_TRANSACTION } from "../action/type"; // Import action type constants
import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_TRANSACTION:
      // Trường hợp lấy danh sách tất cả các giao dịch
      return { ...state, ..._.mapKeys(action.payload, "_id") };
    default:
      return state;
  }
};
