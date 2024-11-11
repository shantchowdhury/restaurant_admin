import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from "react-toastify";

const List = () => {
  const [list, setList] = useState([]);

  const url = 'http://localhost:4000'; // Adjust this to your API endpoint

  // Fetch list items when the component is mounted
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error('Failed to fetch the list.');
      }
    } catch (error) {
      toast.error('Error fetching data.');
      console.error("Error fetching the list: ", error); // Log the error for debugging
    }
  };

  const removeFood = async(foodId) => {
   const response =await axios.post(`${url}/api/food/remove`,{id:foodId});
   await fetchList();
   if(response.data.success) {
    toast.success(response.data.message)
   }
    else{
      toast.error("Error");
    }

  }

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list-add">
      <h2>All Foods List</h2>
      <div className="list-table">
        {/* Table Header */}
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {/* Map through the list items */}
        {list.length > 0 ? (
          list.map((item, index) => (
            <div key={index} className="list-table-format">
              {/* Check if image exists */}
              <img 
                src={item.image ? `${url}/images/${item.image}` : '/placeholder.png'} 
                alt={item.name} 
              />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>৳{item.price}</p>
              <p onClick={()=>removeFood(item._id)} className="cursor">X</p>
            </div>
          ))
        ) : (
          <p>No items found.</p>
        )}
        </div>
        </div>
  );
};

export default List;
