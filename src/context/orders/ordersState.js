import React, {useReducer} from 'react';

import OrdersContext from './ordersContext';
import OrdersReducer from './ordersReducer';

import {
  SELECT_PRODUCT,
  CONFIRM_ORDER_DISH,
  SHOW_RESUME,
  ELIMINATE_DISH,
  ORDER_ORDERED,
} from '../types/index';

const OrdersState = (props) => {
  const initialState = {
    order: [],
    dish: null,
    total: 0,
    idorder: '',
  };

  const [state, dispatch] = useReducer(OrdersReducer, initialState);

  const selectDish = (dish) => {
    dispatch({
      type: SELECT_PRODUCT,
      payload: dish,
    });
  };

  const saveOrder = (order) => {
    dispatch({
      type: CONFIRM_ORDER_DISH,
      payload: order,
    });
  };

  const showResume = (total) => {
    dispatch({
      type: SHOW_RESUME,
      payload: total,
    });
  };

  const eliminateDish = (id) => {
    dispatch({
      type: ELIMINATE_DISH,
      payload: id,
    });
  };

  const orderOrdered = (id) => {
    dispatch({
      type: ORDER_ORDERED,
      payload: id,
    });
  };

  return (
    <OrdersContext.Provider
      value={{
        order: state.order,
        dish: state.dish,
        total: state.total,
        idorder: state.idorder,
        selectDish,
        saveOrder,
        showResume,
        eliminateDish,
        orderOrdered,
      }}>
      {props.children}
    </OrdersContext.Provider>
  );
};

export default OrdersState;
