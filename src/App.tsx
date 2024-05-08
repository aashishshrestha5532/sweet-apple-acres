import "./App.css";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Products from "./pages/products";
import Product from "./pages/product";
import Cart from "./pages/cart";

import ErrorBoundary from "./components/error-boundary";
import { CartProvider } from "./provider/cart-provider";
import Header from "./components/header";

const client = new ApolloClient({
  uri: "https://sweet-apple-acres.netlify.app/.netlify/functions/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <CartProvider>
        <Header />
        <RouterProvider router={router} />
      </CartProvider>
    </ApolloProvider>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Products />,
  },
  {
    path: "/detail/:id",
    errorElement: <ErrorBoundary />,
    element: <Product />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
]);

export default App;
