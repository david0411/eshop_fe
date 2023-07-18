import './App.css'
import {createHashRouter, RouterProvider} from "react-router-dom";
import React from "react";
import ProductListing from "./ui/page/ProductListing";
import ProductDetail from "./ui/page/ProductDetail";
import ShoppingCart from "./ui/page/ShoppingCart";
import LoginPage from "./ui/page/LoginPage";
import Checkout from "./ui/page/Checkout";
import ThankYou from "./ui/page/ThankYou";
import ErrorPage from "./ui/page/ErrorPage";

const router = createHashRouter([
    {
        path: "/",
        element: <ProductListing/>
    },
    {
        path: "/product/:productId",
        element: <ProductDetail/>
    },
    {
        path: "/shoppingcart",
        element: <ShoppingCart/>
    },
    {
        path: "/login",
        element: <LoginPage/>
    },
    {
        path: "/checkout/:transactionId",
        element: <Checkout/>
    },
    {
        path: "/thankyou",
        element: <ThankYou/>
    },
    {
        path: "/error",
        element: <ErrorPage/>
    }
])

function App() {
  return (
    <>
        <RouterProvider router={router}/>
    </>
  )
}

export default App
