import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import axios from "axios";
import ProductCart from "../components/ProductCart";
import Filterproduct from "../components/filterproduct";

const ProductsList = () => {
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);
  const [fetchMore, setFetchMore] = useState(false);
  const [category, setCategory] = useState(null);
  const [priceSort, setPriceSort] = useState(null);

  const handleChangeCategory = (e) => {
    setProducts([]);
    setCategory(e.target.value);
  };

  //hook for fetching Product
  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    if (category) {
      axios({
        method: "GET",
        url: `https://fakestoreapi.com/products/category/${category}?limit=6`,
        params: { page: page },
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
        .then((res) => {
          setProducts((prev) => {
            return [...new Set([...prev, ...res.data])];
          });
          setFetchMore(res.data.length > 0);
          setLoading(false);
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
          setError(true);
        });
    } else {
      axios({
        method: "GET",
        url: `https://fakestoreapi.com/products?limit=20`,
        params: { page: page },
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
        .then((res) => {
          setProducts((prev) => {
            return [...new Set([...prev, ...res.data])];
          });
          setFetchMore(true);
          setLoading(false);
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
          setError(true);
        });
    }
    return () => cancel();
  }, [page, category, priceSort]);

  //infinit scoll handler
  const observer = useRef();
  const lastProduct = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && fetchMore) {
          setPage((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, fetchMore, category]
  );

  const handleFetch = (e) => {
    setPage(1);
  };

  const handleChangePriceSort = (e) => {
    setPriceSort(e.target.value);
  };

  const handleResetFilter = () => {
    setProducts([]);
    setLoading(true);
    setCategory(null);
    setPage(1);
    setPriceSort(null);
  };

  const filteredData = (products, selected, sort) => {
    let filteredProducts = products;
    //sorting by price
    if (sort) {
      if ("desc") {
        filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
      }
      if ("asc") {
        filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
      }
    }

    //filtering by category
    if (selected) {
      filteredProducts = filteredProducts.filter((item) => item.category === selected);
    }
    return filteredProducts?.map((item, i) => {
      if (products.length === i + 1) {
        return (
          <div className='col-lg-3 mb-4' ref={lastProduct} key={Math.random()}>
            <ProductCart item={item} />
          </div>
        );
      } else {
        return (
          <div className='col-lg-3 mb-4' key={Math.random()}>
            <ProductCart item={item} />;
          </div>
        );
      }
    });
  };

  const result = filteredData(products, category, priceSort);

  return (
    <div className='container'>
      <div className='navbarContainer d-flex justify-content-between px-3 mb-5 sticky-top bg-light'>
        <h1 className='title mt-3 mx-3 text-success'>Products</h1>
        <div className='d-flex align-items-center'>
          <Filterproduct
            category={category}
            priceSort={priceSort}
            handleChangeCategory={handleChangeCategory}
            handleChangePriceSort={handleChangePriceSort}
          />
          <button className='mx-3 btn btn-md btn-danger' onClick={handleResetFilter}>
            reset
          </button>
        </div>
      </div>

      <div id='gallery'>
        <div className='container '>
          <div className='row'>{result}</div>
        </div>
      </div>
      <div className='d-flex justify-content-center align-content-center'>
        {loading && (
          <button className='btn btn-primary' type='button' disabled>
            <span
              className='spinner-border spinner-border-sm'
              role='status'
              aria-hidden='true'></span>
            <span className='visually-hidden'>Loading...</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductsList;
