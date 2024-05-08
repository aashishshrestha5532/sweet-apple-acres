import React, { useEffect, useRef } from "react";
import { useCart } from "../provider/cart-provider";
import { gql, useMutation } from "@apollo/client";

const PLACE_ORDER = gql`
  mutation order($input: OrderInput!) {
    order(input: $input) {
      id
      total
    }
  }
`;

const CartPage: React.FC = () => {
  const { cart, reduceItemQuantity, addItemToCart, clearCart } = useCart();

  const nameRef = useRef<any>();
  const addressRef = useRef<any>();

  const [placeOrder, { data, loading, error }] = useMutation(PLACE_ORDER);

  const handleClearCart = () => {
    clearCart();
  };

  useEffect(() => {
    let isLocked = true;
    if (isLocked && data?.order) {
      alert(`Dear ${nameRef.current.value}, Your order is successfully placed`);
      clearCart();
      window.location.href = "/";
      isLocked = false; // prevent from multiple execution
    }

    return () => {
      isLocked = true;
    };
  }, [data, error]);

  const onPlaceOrder = () => {
    try {
      let payload = {
        name: nameRef.current.value, // user name here
        deliveryAddress: addressRef.current.value, // user address here
        items: cart.map((item) => {
          return {
            productId: item.id,
            quantity: item.quantity,
          };
        }),
      };

      placeOrder({ variables: { input: payload } });
    } catch (e) {
      console.error("There was some error placing the order");
    }
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <>
          <p>Your cart is empty.</p>
          <p>
            Go to product <a href="/">page</a>
          </p>
        </>
      ) : (
        <div>
          <form>
            <input
              name="username"
              placeholder="Name"
              className="form-input"
              ref={nameRef}
            />{" "}
            <br />
            <input
              name="deliveryAddresss"
              placeholder="Delivery address"
              className="form-input"
              ref={addressRef}
            />
          </form>
          {cart.map((item, index) => (
            <div key={index} className="cart">
              <img src={item.image} className="cart-image" alt={item.name} />
              <span className="cart-info">
                <p>{item.name}</p>
                <p>Qty: {item.quantity}</p>

                <button
                  onClick={() => {
                    addItemToCart(item);
                  }}
                >
                  +
                </button>
                <span>{item?.quantity}</span>
                <button onClick={() => reduceItemQuantity(item.id)}>-</button>
              </span>
            </div>
          ))}

          <button className="primary-btn" onClick={onPlaceOrder}>
            {loading ? "Placing order..." : "Place order"}
          </button>
          <button onClick={handleClearCart} className="ml-5">
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
