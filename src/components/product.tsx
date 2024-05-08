import { IProduct } from "../interface/product-interface";
import { useCart } from "../provider/cart-provider";

interface IProps {
  product: IProduct;
  onClick: (id: string) => void;
}

export default function Product({ product, onClick }: Readonly<IProps>) {
  const { addItemToCart, cart } = useCart();

  const isItemOnCart = cart.some((item) => item.id === product.id);
  return (
    <div
      key={product.id}
      className="product-card"
      onClick={() => onClick(product.id)}
    >
      <img src={product.image} className="product-image" alt={product.name} />
      <span className="product-details">
        Name: {product.name} <br />
        Price: <b>${product.price}</b> <br />
        <button
          onClick={(event) => {
            event.stopPropagation();

            addItemToCart(product);
          }}
        >
          {isItemOnCart ? "Added to cart" : "Add to cart"}
        </button>
      </span>
    </div>
  );
}
