import {ShoppingCartListDto} from "../../../data/ShoppingCartListDto.ts";
import Box from "@mui/material/Box";
import {Stack} from "@mui/material";
import * as React from "react";
import ShoppingCartListCard from "./ShoppingCartListCard.tsx";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";


export default function ShoppingCartList() {
    const cartItemList: ShoppingCartListDto[] = [
        {
            "pid": 7,
            "name": "Moon Dust",
            "price": 50.00,
            "image_url": "https://bananafingers.com/media/catalog/product/m/o/moon-dust-loose-min_1.jpg",
            "cart_quantity": 66,
            "stock": 1970
        },
        {
            "pid": 2,
            "name": "Scarpa Booster",
            "price": 1200.00,
            "image_url": "https://bananafingers.com/media/catalog/product/b/o/booster_with_logo_0_4.jpg",
            "cart_quantity": 8,
            "stock": 20
        }
    ]
    const HKDollar = new Intl.NumberFormat('zh-HK', {
        style: 'currency',
        currency: 'HKD',
    });
    let totalAmt = 0;

    const handleCheckout = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

    }

    const renderCartItemList = () => {
        return cartItemList.map((value) => {
            totalAmt += value.price * value.cart_quantity
            return <ShoppingCartListCard key={value.pid} data={value}/>
        })
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