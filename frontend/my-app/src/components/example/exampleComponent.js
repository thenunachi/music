// ExampleComponent.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getItems, createItem, updateItem, deleteItem } from '../../store/action';

const ExampleComponent = () => {
  const dispatch = useDispatch();
  

  const items = useSelector(state => state.items || []);

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  const handleAddItem = () => {
    dispatch(createItem({ name: 'New Item' }));
  };

  const handleUpdateItem = (id) => {
    dispatch(updateItem(id, { name: 'Updated Item' }));
  };

  const handleDeleteItem = (id) => {
    dispatch(deleteItem(id));
  };

  return (
    <div>
      {items.map(item => (
        <div key={item.id}>
          <p>{item.name}</p>
          <button onClick={() => handleUpdateItem(item.id)}>Update</button>
          <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
        </div>
      ))}
      <button onClick={handleAddItem}>Add Item</button>
    </div>
  );
};

export default ExampleComponent;
