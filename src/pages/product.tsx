import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { useCart } from "../provider/cart-provider";
import { IProduct } from "../interface/product-interface";

const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      name
      description
      image
      price
      rating
      releated {
        id
        name
        image
        rating
      }
    }
  }
`;

const ProductDetail = () => {
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return `Error! ${error}`;

  const { product }: { product: IProduct } = data;

  const { cart, addItemToCart, reduceItemQuantity } = useCart();

  const item = cart.find((item) => item.id === product.id);

  return (
    <div>
      <h2>{product.name}</h2>
      <img
        src={product.image}
        className="product-detail-image"
        alt={product.name}
      />
      <div>
        Price: ${product.price} <br />
        Rating: {product.rating} <br />
        <b>{product.isAvailable ? "In Stock" : "Out of Stock"}</b>
        <p>{product.description}</p>
      </div>
      Quantity:
      <button onClick={() => reduceItemQuantity(product.id)}>-</button>
      <span className="mx-1">{item?.quantity ?? 0}</span>
      <button
        onClick={() => {
          addItemToCart(product);
        }}
      >
        +
      </button>
    </div>
  );
};
export default ProductDetail;
