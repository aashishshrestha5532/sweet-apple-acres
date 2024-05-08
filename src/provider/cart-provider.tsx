import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface Item {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cart: Item[];
  addItemToCart: (item: Item) => void;
  clearCart: () => void;
  reduceItemQuantity: (id: string) => void;
  removeItemFromCart: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Item[]>([]);

  useEffect(() => {
    // load cart from local storage on component mount
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const saveCartState = (cartState: any) => {
    setCart(cartState);
    localStorage.setItem("cart", JSON.stringify([...cartState]));
  };

  const addItemToCart = (item: Item) => {
    const index = cart.findIndex((cartItem) => cartItem.id === item.id);

    if (index === -1) {
      // if the item is not in the cart, add it with quantity 1
      const newCart = [...cart, { ...item, quantity: 1 }];
      saveCartState([...newCart]);
    } else {
      // if the item is already in the cart, update its quantity
      const updatedCart = [...cart];
      updatedCart[index].quantity += 1;
      saveCartState([...updatedCart]);
    }
  };

  const reduceItemQuantity = (id: string) => {
    const updatedCart = [...cart];
    const existingCartItemIndex = updatedCart.findIndex(
      (item) => item.id === id
    );

    if (existingCartItemIndex !== -1) {
      const existingCartItem = updatedCart[existingCartItemIndex];
      if (existingCartItem.quantity > 1) {
        existingCartItem.quantity -= 1;
      } else {
        updatedCart.splice(existingCartItemIndex, 1);
      }
      saveCartState([...updatedCart]);
    }
  };

  const removeItemFromCart = (id: string) => {
    const newCart = cart.filter((item) => item.id !== id);

    saveCartState([...newCart]);
  };

  const clearCart = () => {
    // clear cart state
    saveCartState([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItemToCart,
        clearCart,
        reduceItemQuantity,
        removeItemFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
