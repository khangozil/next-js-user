"use client";

import { fetchListOfProduct } from "@/actions/page";
import { useEffect, useState } from "react";

function ClientPageExample() {
  const [products, setProducts] = useState();
  const [loading , setLoading] = useState(true);
  async function getListOfProduct() {
    const data = await fetchListOfProduct();
    console.log(data);
    if(data) setProducts(data);
    setLoading(false)
  }
  useEffect(() => {
    getListOfProduct();
  }, []);

  if(loading) return <h1>Loading data ! Please wait</h1>
  return (
    <div>
      <h1>Client Page</h1>
      <ul>
        {products && products.length > 0 ? (
          products.map((item) => <li>{item.title}</li>)
        ) : (
          <h2> Not found products</h2>
        )}
      </ul>
    </div>
  );
}

export default ClientPageExample;
