import { useQuery, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import Product from "../components/product";
import { IProduct } from "../interface/product-interface";

const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      price
      rating
      image
    }
  }
`;

const Products = () => {
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return (
    <div>
      <h2>Products</h2>

      <div>
        {data.products.map((product: IProduct) => (
          <Product
            product={product}
            onClick={(id: string) => {
              navigate(`/detail/${id}`);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
