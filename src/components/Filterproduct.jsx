import React from "react";

const Filterproduct = ({ ...props }) => {
  const { handleChangeCategory, handleChangePriceSort, priceSort, category } = props;
  return (
    <div className='filterContainer d-flex my-3'>
   
      <div className='filter'>
        <span className='fs-5 fw-normal ms-3'>
          <select
            placeholder='filter by Category'
            className='p-1'
            onChange={(e) => handleChangeCategory(e)}>
            <option value='' disabled selected={!category} hidden>
              Category ...
            </option>
            <option value={"men's clothing"}>men's clothing</option>
            <option value={"jewelery"}>jewelery</option>
            <option value={"electronics"}>electronics</option>
          </select>
        </span>
      </div>
      <div className='filter'>
        <span className='fs-5 fw-normal ms-3'>
          <select className='p-1 ms-3' onChange={(e) => handleChangePriceSort(e)}>
            <option value='' disabled selected={!priceSort} hidden>
              Price
            </option>
            <option value={"acs"}>Price (asc)</option>
            <option value={"desc"}>Price (desc)</option>
          </select>
        </span>
      </div>
    </div>
  );
};

export default Filterproduct;
