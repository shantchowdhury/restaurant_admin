import React, { useEffect, useState } from 'react';
import './Orders.css';
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from '../../assets/assets';

const Orders = ({ url = "https://restaurant-be-uo5b.onrender.com" }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      console.log("API URL:", url + "/api/order/list");
      const response = await axios.get(url + "/api/order/list");
      
  
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data); // Check if the response data is correct here
      } else {
        toast.error("Error fetching orders");
        console.log(response.data); // Log the error for further inspection
      }
    } catch (error) {
      // Handle network or server errors
      toast.error("Failed to fetch orders");
      console.error("Error fetching orders:", error);
    }
  };

  const statusHandler = async (event,orderId) =>{
    const response = await axios.post(url+"/api/order/status",{
      orderId,
      status:event.target.value
    })
    if (response.data.success) {
      await fetchAllOrders();
    }
  }


  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className='order-list'>
        {orders.map((order,index)=>(
          <div key={index} className='order-item'>
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className='order-item-food'>
                {order.items.map((item,index)=>{
                  if (index===order.items.length-1){
                    return item.name + " x " + item.quantity
                  }
                  else {
                    return item.name + " x " + item.quantity + ","
                  }
                })}
              </p>
              <p className='order-item-name'>{order.address.firstName+" "+order.address.lastName}</p>
                <div className="order-item-address">
                <p>{order.address.street+","}</p>
                <p>{order.address.city+", "+order.address.place+", "+order.address.country+", "+order.address.zipcode}</p>
            </div>
            <p className='order-item-phone'>{order.address.phone}</p>
          </div>
          <p>Items : {order.items.length}</p>
          <p>৳{order.amount}</p>
          <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
                <option value="Food Processing">"Food Processing"</option>
                <option value="Out For Delivery">"Out For Delivery"</option>
                <option value="Delivered">"Delivered"</option>
          </select>
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default Orders;
