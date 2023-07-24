import {ShoppingCartListDto} from "../../../data/ShoppingCartListDto.ts";
import Box from "@mui/material/Box";
import * as React from "react";
import {TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from "@mui/material/Typography";
import {getAccessToken} from "../../../authService/FirebaseAuthService.ts";
import * as UpdateCartItemApi from "../../../Api/UpdateCartItemApi.ts";
import * as DeleteCartItemApi from "../../../Api/DeleteCartItemApi.ts";
import {useNavigate} from "react-router-dom";
import * as GetShoppingCartListApi from "../../../Api/GetShoppingCartListApi.ts";

type Props = {
    data: ShoppingCartListDto
    update: React.Dispatch<React.SetStateAction<ShoppingCartListDto[] | null | undefined>>
}

export default function ShoppingCartListCard(props:Props)  {
    const [cartItem, setCartItem] = React.useState<ShoppingCartListDto>(props.data)
    const [itemSubtotal, setItemSubtotal] = React.useState<number>(props.data.price*props.data.cart_quantity)
    const HKDollar = new Intl.NumberFormat('zh-HK', {
        style: 'currency',
        currency: 'HKD',
    });
    const navigate = useNavigate();

    const fetchCartData = async () => {
        try {
            props.update(undefined)
            const token = await getAccessToken()
            if(token)  {
                props.update(await GetShoppingCartListApi.getShoppingCartListApi(token))
            }
        } catch (e) {
            navigate("/error")
        }
    }

    const handleQtyChange = async (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        try {
            const token = await getAccessToken()
            if (token) {
                const updatedCartItem:ShoppingCartListDto|undefined = await UpdateCartItemApi.updateCartItemApi(token, props.data.pid.toString(), event.target.value.toString())
                if (updatedCartItem)    {
                    setCartItem(updatedCartItem)
                }
                setItemSubtotal(Number(event.target.value) * props.data.price);
            }
        } catch (e) {
            navigate("/error")
        } finally {
            await fetchCartData()
        }
    }

    const handleDeleteCartItem = async () => {
        try {
            const token = await getAccessToken()
            if (token) {
                await DeleteCartItemApi.deleteCartItemApi(token, props.data.pid.toString());
                await fetchCartData()
            }
        } catch (e) {
            navigate("/error")
        }
    }

    return <>
        <Box display="flex" flexDirection="row" key={cartItem.pid}>
            <Box width="20%">
                <img src={cartItem.image_url}
                     alt={cartItem.name}
                     loading="lazy"
                     height='80px'/>
            </Box>
            <Box width="20%" sx={{
                display: "flex",
                alignItems: "center"
            }}>
                <Typography
                    sx={{margin: "auto auto auto 0"}}>
                    {cartItem.name}
                </Typography>
            </Box>
            <Box width="15%" sx={{
                display: "flex",
                alignItems: "center"
            }}>
                <Typography
                sx={{margin: "auto"}}>
                    {HKDollar.format(cartItem.price)}
                </Typography>
            </Box>
            <Box width="15%" sx={{
                display: "flex",
                alignItems: "center"
            }}>
                <TextField
                    id={cartItem.pid.toString() + "_itemQuantity"}
                    type="number"
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                    size={"small"}
                    inputProps={{min: 1, max: cartItem.stock}}
                    onBlur={handleQtyChange}
                    defaultValue={cartItem.cart_quantity}
                />
            </Box>
            <Box width="25%" sx={{
                display: "flex",
                alignItems: "center"
            }}>
                <Typography
                    sx={{margin: "auto"}}>
                    {HKDollar.format(itemSubtotal)}
                </Typography>

            </Box>
            <Box width="5%" sx={{
                display: "flex",
                alignItems: "center"
            }}>
                <IconButton
                    size="large"
                    color="inherit"
                    onClick={handleDeleteCartItem}
                >
                    <DeleteIcon/>
                </IconButton>
            </Box>
        </Box>
    </>
}