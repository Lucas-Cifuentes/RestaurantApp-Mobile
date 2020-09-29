import {GET_PRODUCTS_SUCCESS} from '../types/index';

const FirebaseReducer = (state, action) => {
  switch (action.type) {
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        menu: action.payload,
      };

    default:
      return state;
  }
};

export default FirebaseReducer;
