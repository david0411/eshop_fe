import './App.css'
import {createHashRouter, RouterProvider} from "react-router-dom";
import {createContext, useEffect, useState} from "react";
import ProductListing from "./ui/page/ProductListing";
import ProductDetail from "./ui/page/ProductDetail";
import ShoppingCart from "./ui/page/ShoppingCart";
import LoginPage from "./ui/page/LoginPage";
import Checkout from "./ui/page/Checkout";
import ThankYou from "./ui/page/ThankYou";
import ErrorPage from "./ui/page/ErrorPage";
import {UserData} from "./data/UserData.ts";
import * as FirebaseAuthService from "../src/authService/FirebaseAuthService.ts"
import UserProfile from "./ui/component/User/UserProfile.tsx";

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
    },
    {
        path: "/profile",
        element: <UserProfile/>
    }
])

export const userContext = createContext<UserData | null | undefined>(undefined);


function App() {
    const [loginUser, setLoginUser] = useState<UserData | null | undefined>(undefined);

    useEffect(() => {
        FirebaseAuthService.handleOnAuthStateChanged(setLoginUser);
    }, []);
    return (
        <>
            <userContext.Provider value={loginUser}>
                <RouterProvider router={router}/>
            </userContext.Provider>
        </>
    )
}

export default App
