import React, {useReducer} from 'react';

import FirebaseReducer from './firebaseReducer';
import FirebaseContext from './firebaseContext';
import firebase from '../../../firebase/index';

import {GET_PRODUCTS_SUCCESS} from '../types/index';

import _ from 'lodash';

const FirebaseState = (props) => {
  const initialState = {
    menu: [],
  };

  const [state, dispatch] = useReducer(FirebaseReducer, initialState);

  const getProducts = async () => {
    try {
      await firebase.db
        .collection('products')
        .where('status', '==', true)
        .onSnapshot(handleSnapshot);

      function handleSnapshot(snapshot) {
        const dish = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });

        const dishSortByCategory = _.sortBy(dish, 'category');
        dispatch({
          type: GET_PRODUCTS_SUCCESS,
          payload: dishSortByCategory,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FirebaseContext.Provider value={{menu: state.menu, firebase, getProducts}}>
      {props.children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseState;
