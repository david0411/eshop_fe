import * as React from "react";
import {useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {userContext} from "../../../App.tsx";
import {ShoppingCartListDto} from "../../../data/ShoppingCartListDto.ts";
import * as GetShoppingCartListApi from "../../../Api/GetShoppingCartListApi.ts";
import * as PrepTransApi from "../../../Api/PrepTransApi.ts";
import {getAccessToken} from "../../../authService/FirebaseAuthService.ts";
import ShoppingCartListCard from "./ShoppingCartListCard.tsx";
import Loading from "../Utility/Loading.tsx";

export default function ShoppingCartList() {
    const [cartItemList, setCartItemList] = React.useState<ShoppingCartListDto[]|undefined|null>(undefined);
    const [transId, setTransId] = React.useState<string|undefined>(undefined);
    const HKDollar = new Intl.NumberFormat('zh-HK', {
        style: 'currency',
        currency: 'HKD',
    });
    const navigate = useNavigate();
    const loginUser = useContext(userContext);
    let totalAmt = 0;

    const fetchCartData = async () => {
        try {
            const token = await getAccessToken()
            if(token)  {
                setCartItemList(await GetShoppingCartListApi.getShoppingCartListApi(token))
            }
        } catch (e) {
            navigate("/error")
        }
    }

    const handleCheckout = async () => {
        const token = await getAccessToken()
        setTransId(undefined)
        if (token) {
            const result = await PrepTransApi.prepTransApi(token)
            setTransId(result.tid.toString())
        }
    }

    const renderCartItemList = () => {
        if(cartItemList && cartItemList.length>0)  {
            return cartItemList.map((value) => {
                totalAmt += value.price * value.cart_quantity
                return <ShoppingCartListCard key={value.pid} data={value} update={setCartItemList}/>
            })
        } else  {
            return <Loading/>
        }
    }

    const cartItemListHeader = () => {
        return <>
            <Box display="flex" flexDirection="row">
                <Box width="20%" sx={{
                    textAlign: "center"
                }}>
                    <Typography
                        variant="subtitle2"
                        noWrap
                        component="div"
                        sx={{display: {xs: 'none', sm: 'block'}}}
                    >Item Image
                    </Typography>
                </Box>
                <Box width="20%" sx={{
                    textAlign: "center"
                }}>
                    <Typography
                        variant="subtitle2"
                        noWrap
                        component="div"
                        sx={{display: {xs: 'none', sm: 'block'}}}
                    >Item Name</Typography>
                </Box>
                <Box width="15%" sx={{
                    textAlign: "center"
                }}>
                    <Typography
                        variant="subtitle2"
                        noWrap
                        component="div"
                        sx={{display: {xs: 'none', sm: 'block'}}}
                    >Unit Price
                    </Typography>
                </Box>
                <Box width="15%" sx={{
                    textAlign: "center"
                }}>
                    <Typography
                        variant="subtitle2"
                        noWrap
                        component="div"
                        sx={{display: {xs: 'none', sm: 'block'}}}
                    >Item Qty
                    </Typography>
                </Box>
                <Box width="25%" sx={{
                    textAlign: "center"
                }}>
                    <Typography
                        variant="subtitle2"
                        noWrap
                        component="div"
                        sx={{display: {xs: 'none', sm: 'block'}}}
                    >Item Subtotal
                    </Typography>
                </Box>
            </Box>
        </>
    }

    const cartItemListFooter = () => {
        return <Box display="flex" flexDirection="row">
            <Box width="70%" sx={{
                display: "flex",
                alignItems: "center"
            }}>
                <Typography
                    sx={{margin: "auto 0 auto auto"}}>
                    Total:
                </Typography>
            </Box>
            <Box width="25%" sx={{
                display: "flex",
                alignItems: "center"
            }}>
                <Typography
                    sx={{margin: "auto"}}>
                    {HKDollar.format(totalAmt)}
                </Typography>
            </Box>
            <Box width="5%">
            </Box>
        </Box>
    }

    const cartItemListCheckout = () => {
        return <Box display="flex" flexDirection="row">
            <Box width="70%">
            </Box>
            <Box width="25%" sx={{
                display: "flex",
                alignItems: "center"
            }}>
                <Button variant="contained" fullWidth onClick={handleCheckout}>Checkout</Button>
            </Box>
            <Box width="5%">
            </Box>
        </Box>
    }

    useEffect( () => {
        setCartItemList(undefined)
        if(loginUser){
            void fetchCartData()
        }   else if(loginUser===null)   {
            navigate('/login')
        }
        if(transId) {
            navigate('/checkout/'+ transId)
        }
    },[loginUser, transId]);

    return <>
        <Box height="70px"></Box>

        <Stack maxWidth={900} margin="auto" key="CartItemStack">
            <Box maxWidth={900} margin="auto">
                <h1>Shopping Cart</h1>
            </Box>
            {cartItemListHeader()}
            {renderCartItemList()}
            {cartItemListFooter()}
            {cartItemListCheckout()}
        </Stack>
        </>
}