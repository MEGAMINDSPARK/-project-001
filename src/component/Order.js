import React, { useState } from 'react';

function OrderForm({ addOrder }) {
  const [order, setOrder] = useState({
    id: '',
    tableNumber: '',
    dish: '',
    price: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setOrder((prevOrder) => ({ ...prevOrder, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (order.id && order.tableNumber && order.dish && order.price) {
      addOrder(order);
      // Reset the order form
      setOrder({
        id: '',
        tableNumber: '',
        dish: '',
        price: '',
      });
    } else {
      console.error('Please fill out all fields.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Unique ID:
        <input type="number" name="id" value={order.id} onChange={handleInputChange} />
      </label>

      <label>
        Table Number:
        <input type="number" name="tableNumber" value={order.tableNumber} onChange={handleInputChange} />
      </label>

      <label>
        Dish:
        <input type="text" name="dish" value={order.dish} onChange={handleInputChange} />
      </label>

      <label>
        Price:
        <input type="number" name="price" value={order.price} onChange={handleInputChange} />
      </label>

      <button type="submit">Add to Bill</button>
    </form>
  );
}

function Restaurant() {
  const [orders, setOrders] = useState([]);

  const addOrder = (newOrder) => {
    setOrders([...orders, newOrder]);
  };

  const handleDeleteOrder = (id) => {
    const newOrders = orders.filter((order) => order.id !== id);
    setOrders(newOrders);
  };

  return (
    <div>
      <h1>Restaurant Order Form</h1>
      <OrderForm addOrder={addOrder} />
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <p>Dish: {order.dish}</p>
            <p>Price: ${order.price}</p>
            <p>Table Number: {order.tableNumber}</p>
            <button onClick={() => handleDeleteOrder(order.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Restaurant;