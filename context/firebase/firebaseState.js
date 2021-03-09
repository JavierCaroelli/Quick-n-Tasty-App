import React, { useReducer } from "react";

import firebase from "../../firebase";
import FirebaseReducer from "./firebaseReducer";
import FirebaseContext from "./firebaseContext";

import _ from "lodash";

import { GET_PRODUCTS_SUCCESS } from "../../types";

const FirebaseState = (props) => {
  // InitialState
  const initialState = {
    menu: [],
  };

  // UseReducer with a dispatch to Execute the functions
  const [state, dispatch] = useReducer(FirebaseReducer, initialState);

  // Get products function
  const getProducts = () => {
    dispatch({
      type: GET_PRODUCTS_SUCCESS,
    });

    // Watch Firebase
    firebase.db.collection("products").where("exist", "==", true).onSnapshot(handleSnapshot);

    function handleSnapshot(snapshot) {
      let dishes = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      // Sort by category with lodash
      dishes = _.sortBy(dishes, "category");

      // Now we have db results
      dispatch({
        type: GET_PRODUCTS_SUCCESS,
        payload: dishes,
      });
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        menu: state.menu,
        firebase: firebase,
        getProducts,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseState;
