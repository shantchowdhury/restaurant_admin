import React, { useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';


const Add = () => {
  const url = 'http://localhost:4000';
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Sweet Shakes & Classics',
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', Number(data.price));
    formData.append('category', data.category);
    formData.append('image', imageFile); // Correct the image file

    try {
      const response = await axios.post(`${url}/api/food/add`, formData);
      if (response.data.success) {
        // Clear the form after successful submission
        setData({
          name: '',
          description: '',
          price: '',
          category: 'Sweet Shakes & Classics',
        });

        setImageFile(null);
        setImagePreview(null); // Clear the image preview
        console.log('Product added successfully');

        toast.success(response.data.message)
      } 
      else {
        console.log('Failed to add product');
      }
    } catch (error) {
      console.error('Error while adding product:', error);
    }
  };

  // Function to handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Preview the image
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className='add-image-upload flex col'>
          <p>Upload Image</p>
          <label htmlFor='image'>
            {imagePreview ? (
              <img src={imagePreview} alt='Preview' className='image-preview' />
            ) : (
              <img src={assets.upload_area} alt='Upload Area' />
            )}
          </label>
          <input
            type='file'
            id='image'
            hidden
            required
            onChange={handleImageChange}
          />
        </div>
        <div className='add-product-name flex col'>
          <p>Product name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type='text'
            name='name'
            placeholder='Type Here'
            autoComplete='off'
          />
        </div>
        <div className='add-product-description flex-col'>
          <p>Product description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name='description'
            rows='6'
            placeholder='Write content here'
            required
            autoComplete='off'
          ></textarea>
        </div>
        <div className='add-category-price'>
          <div className='add-category flex-col'>
            <p>Product category</p>
            <select
              onChange={onChangeHandler}
              name='category'
              value={data.category}
              autoComplete='off'
            >
              <option value='Sweet Shakes & Classics'>Sweet Shakes & Classics</option>
              <option value='Rolls'>Rolls</option>
              <option value='Desserts'>Desserts</option>
              <option value='Sandwich'>Sandwich</option>
              <option value='Cake'>Cake</option>
              <option value='Majestic Rice Platters'>Majestic Rice Platters</option>
              <option value='Pasta'>Pasta</option>
              <option value='Noodles'>Noodles</option>
            </select>
          </div>
          <div className='add-price flex col'>
            <p>Product price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type='number'
              name='price'
              placeholder='৳50'
              autoComplete='off'
            />
          </div>
        </div>
        <button type='submit' className='add-btn'>
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
