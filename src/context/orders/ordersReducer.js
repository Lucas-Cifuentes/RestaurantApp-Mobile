import {
  SELECT_PRODUCT,
  CONFIRM_ORDER_DISH,
  SHOW_RESUME,
  ELIMINATE_DISH,
  ORDER_ORDERED,
} from '../types/index';

const OrdersReducer = (state, action) => {
  switch (action.type) {
    case SELECT_PRODUCT:
      return {
        ...state,
        dish: action.payload,
      };
    case CONFIRM_ORDER_DISH:
      return {
        ...state,
        order: [...state.order, action.payload],
      };
    case SHOW_RESUME:
      return {
        ...state,
        total: action.payload,
      };
    case ELIMINATE_DISH:
      return {
        ...state,
        order: state.order.filter((article) => article.id !== action.payload),
      };
    case ORDER_ORDERED:
      return {
        ...state,
        idorder: action.payload,
      };
    default:
      return state;
  }
};

export default OrdersReducer;
