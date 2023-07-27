import IconButton from "@mui/material/IconButton";
import {useNavigate} from "react-router-dom";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {useContext, useEffect} from "react";
import {userContext} from "../../../App.tsx";
import * as React from "react";
import {CartItemListDto} from "../../../data/CartItem/CartItemListDto.ts";
import {getAccessToken} from "../../../authService/FirebaseAuthService.ts";
import * as CartApi from "../../../Api/Cart/CartApi.ts";

export default function SearchBarCartButton()   {
    const [cartItemList, setCartItemList] = React.useState<CartItemListDto[]|undefined|null>(undefined)
    const loginUser = useContext(userContext)
    const navigate = useNavigate()

    const handleToCart = () => {
        navigate('/shoppingcart');
    }

    const handleToLogin = () => {
        navigate('/login');
    }

    const fetchCartData = async () => {
        try {
            const token = await getAccessToken()
            if(token)  {
                setCartItemList(await CartApi.getCartItemListApi(token))
            }
        } catch (e) {
            navigate("/error")
        }
    }

    useEffect( () => {
        setCartItemList(undefined)
        if(loginUser){
            void fetchCartData()
        }   else if(loginUser===null)   {
            navigate('/login')
        }
    },[loginUser]);

    function cartButton() {
        if (loginUser) {
            return <IconButton
                size="large"
                aria-label="show 4 new mails"
                onClick={handleToCart}
                color="inherit">
                <Badge badgeContent={cartItemList?cartItemList.length:0} color="error">
                    <ShoppingCartIcon/>
                </Badge>
            </IconButton>
        } else {
            return <IconButton
                size="large"
                aria-label="show 4 new mails"
                onClick={handleToLogin}
                color="inherit">
            </IconButton>
        }
    }

    return  <>
        {cartButton()}
    </>
}