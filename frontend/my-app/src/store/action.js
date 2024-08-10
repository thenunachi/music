// actions.js
import { apiService } from './apiService';

export const GET_ITEMS = 'GET_ITEMS';
export const CREATE_ITEM = 'CREATE_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';

export const getItems = () => async (dispatch) => {
  try {
    const items = await apiService.getItems();
    dispatch({ type: GET_ITEMS, payload: items });
  } catch (error) {
    console.error('Error fetching items:', error);
  }
};

export const createItem = (item) => async (dispatch) => {
  try {
    const newItem = await apiService.createItem(item);
    dispatch({ type: CREATE_ITEM, payload: newItem });
  } catch (error) {
    console.error('Error creating item:', error);
  }
};

export const updateItem = (id, item) => async (dispatch) => {
  try {
    const updatedItem = await apiService.updateItem(id, item);
    dispatch({ type: UPDATE_ITEM, payload: updatedItem });
  } catch (error) {
    console.error('Error updating item:', error);
  }
};

export const deleteItem = (id) => async (dispatch) => {
  try {
    await apiService.deleteItem(id);
    dispatch({ type: DELETE_ITEM, payload: id });
  } catch (error) {
    console.error('Error deleting item:', error);
  }
};
