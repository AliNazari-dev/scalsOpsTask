import React from "react";

const ProductsCart = ({ item }) => {
  return (
    <div className='card'>
      <div className='d-flex justify-content-center pt-5'>
        <img
          src={item?.image}
          alt=''
          className='card-img-top'
          style={{ width: "100px", height: "100px" }}
        />
      </div>
      <div className='card-body'>
        <h5 className='card-title'>{item?.title.slice(0, 10)}</h5>
        <p className='card-text'>{item?.description.slice(0, 90)} ....</p>
        <div className='d-flex justify-content-between'>
          <p className='card-text fw-bolder text-primary'>{item?.price} $</p>
          <p className='card-text'>{item?.category}</p>
        </div>
        <button type='submit' className='btn btn-outline-success btn-sm w-100'>
          Add more
        </button>
      </div>
    </div>
  );
};

export default ProductsCart;
