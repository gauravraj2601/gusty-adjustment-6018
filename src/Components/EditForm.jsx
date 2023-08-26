import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editProduct } from '../Redux/Crud/action';
import styled from 'styled-components';

const EditForm = ({Id}) => {
  const dispatch = useDispatch();
  const products= useSelector((store)=>store.productReducer.products);

  const [product, setProduct] = useState({
    name: '',
    category: '',
    price: '',
    company: '',
    image: '',
    color: [],
    Highlights: [],
  });

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === Id);

    console.log(Id)
    console.log(foundProduct)
    
    if (foundProduct) {
      setProduct({
        ...foundProduct,
        // color: foundProduct?.color.join(','),
        // Highlights: foundProduct?.Highlights.join('\n'),
      });
    }
  }, [Id, products]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProductData = {
      ...product,
      color: product.color.split(','),
      Highlights: product.Highlights.split('\n'),
    };

    // dispatch(editProduct(updatedProductData));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  return (
    <FormContainer className='editForm'>
    <h1>Edit Product</h1>
    <Form onSubmit={handleSubmit}>
      <label >Product Name:</label>
      <input
        type="text"
        id="productName"
        value={product.name}
        onChange={handleInputChange}
        required
      />

      <label >Product Category:</label>
      <input
        type="text"
        id="productCategory"
        value={product.category}
        onChange={handleInputChange}
        required
      />

      <label >Product Price:</label>
      <input
        type="number"
        id="productPrice"
        value={product.price}
        onChange={handleInputChange}
        required
      />

      <label >Product Company:</label>
      <input
        type="text"
        id="productCompany"
        value={product.company}
        onChange={handleInputChange}
        required
      />

      <label >Product Image URL:</label>
      <input
        type="url"
        id="productImage"
        value={product.image}
        onChange={handleInputChange}
        required
      />

      <label >Product Colors (Comma-separated):</label>
      <input
        type="text"
        id="productColors"
        value={product.color}
        onChange={handleInputChange}
        required
      />

      <label >Product Highlights (Line-separated):</label>
      <textarea
        id="productHighlights"
        value={product.Highlights.join('\n')}
        onChange={handleInputChange}
        required
      />

        <SubmitButton type='submit'>Edit Product</SubmitButton>
      </Form>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  background-color: gray;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

export default EditForm;