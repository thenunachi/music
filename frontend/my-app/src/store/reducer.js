// reducer.js
import { GET_ITEMS, CREATE_ITEM, UPDATE_ITEM, DELETE_ITEM } from './actions';

const initialState = {
  items: [],
};

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS:
      return { ...state, items: action.payload };
    case CREATE_ITEM:
      return { ...state, items: [...state.items, action.payload] };
    case UPDATE_ITEM:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    default:
      return state;
  }
};

export default itemReducer;
