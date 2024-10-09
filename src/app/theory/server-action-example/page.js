import { fetchListOfProduct } from "@/actions/page";

async function ServerActionExample() {

  const products = await fetchListOfProduct();
  console.log(products);
  return (
    <div>
      <h1> Server action example </h1>
      <ul>
        {
            products && products.length > 0 ? (
                products.map((item) => <li>{item.title}</li>) 
            )
            : (<h2> Not found products</h2>)
        }
      </ul>
    </div>
  );
}

export default ServerActionExample;
