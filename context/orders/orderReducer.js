import {
  SELECT_PRODUCT,
  CONFIRM_DISH_ORDER,
  SHOW_TOTAL_SUMMARY,
  DELETE_ITEM,
  ORDER_SENDED,
} from "../../types/index";

export default (state, action) => {
  switch (action.type) {
    case SELECT_PRODUCT:
      return {
        ...state,
        dish: action.payload,
      };
    case CONFIRM_DISH_ORDER:
      return {
        ...state,
        order: [...state.order, action.payload],
      };
    case SHOW_TOTAL_SUMMARY:
      return {
        ...state,
        total: action.payload,
      };
    case DELETE_ITEM:
      return {
        ...state,
        order: state.order.filter((item) => item.id !== action.payload),
      };
    case ORDER_SENDED:
      return {
        ...state,
        order: [],
        total: 0,
        idOrder: action.payload,
      };
    default:
      return state;
  }
};
