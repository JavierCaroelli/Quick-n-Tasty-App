import React, { useReducer } from "react";

import OrderReducer from "./orderReducer";
import OrderContext from "./orderContext";

import {
  SELECT_PRODUCT,
  CONFIRM_DISH_ORDER,
  SHOW_TOTAL_SUMMARY,
  DELETE_ITEM,
  ORDER_SENDED,
} from "../../types/index";

const OrderState = (props) => {
  // InitialState
  const initialState = {
    order: [],
    dish: null,
    total: 0,
    idOrder: "",
  };

  // UseRedcer with a dispatch to Execute the functions
  const [state, dispatch] = useReducer(OrderReducer, initialState);

  // Select Product to Order
  const selectDish = (dish) => {
    dispatch({
      type: SELECT_PRODUCT,
      payload: dish,
    });
  };

  // Dish Confirmed
  const saveOrder = (order) => {
    dispatch({
      type: CONFIRM_DISH_ORDER,
      payload: order,
    });
  };

  // Show Total Price of the Order
  const showTotalPrice = (total) => {
    dispatch({
      type: SHOW_TOTAL_SUMMARY,
      payload: total,
    });
  };

  // Erase Item from Order
  const deleteItem = (id) => {
    dispatch({
      type: DELETE_ITEM,
      payload: id,
    });
  };

  // Confirm Order
  const orderSended = (id) => {
    dispatch({
      type: ORDER_SENDED,
      payload: id,
    });
  };

  return (
    <OrderContext.Provider
      value={{
        order: state.order,
        dish: state.dish,
        total: state.total,
        idOrder: state.idOrder,
        selectDish,
        saveOrder,
        showTotalPrice,
        deleteItem,
        orderSended,
      }}
    >
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderState;
