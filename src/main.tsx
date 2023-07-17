import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createHashRouter, RouterProvider} from "react-router-dom";
import ProductListing from "./ui/page/ProductListing";
import ProductDetail from "./ui/page/ProductDetail";
import ShoppingCart from "./ui/page/ShoppingCart";
import LoginPage from "./ui/page/LoginPage";
import Checkout from "./ui/page/Checkout";
import ThankYou from "./ui/page/ThankYou";

const router = createHashRouter([
    {
        path: "/",
        element: <ProductListing/>
    },
    {
        path: "/product/:productId/:userId",
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
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
