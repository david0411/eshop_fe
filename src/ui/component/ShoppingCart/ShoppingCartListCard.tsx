import {ShoppingCartListDto} from "../../../data/ShoppingCartListDto.ts";
import Box from "@mui/material/Box";
import * as React from "react";
import {TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from "@mui/material/Typography";

type Props = {
    data: ShoppingCartListDto
}

export default function ShoppingCartListCard(props:Props)  {
    const [itemSubtotal, setItemSubtotal] = React.useState<number>(props.data.price*props.data.cart_quantity)
    const [itemQty, setItemQty] = React.useState<number>(props.data.cart_quantity)
    const HKDollar = new Intl.NumberFormat('zh-HK', {
        style: 'currency',
        currency: 'HKD',
    });

    const handleQtyChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setItemQty(Number(event.target.value));
        setItemSubtotal(Number(event.target.value)*props.data.price);
    }

    return <>
        <Box display="flex" flexDirection="row">
            <Box width="20%">
                <img src={props.data.image_url}
                     alt={props.data.name}
                     loading="lazy"
                     height='80px'/>
            </Box>
            <Box width="20%" sx={{
                display: "flex",
                alignItems: "center"
            }}>
                <Typography
                    sx={{margin: "auto auto auto 0"}}>
                    {props.data.name}
                </Typography>
            </Box>
            <Box width="15%" sx={{
                display: "flex",
                alignItems: "center"
            }}>
                <Typography
                sx={{margin: "auto"}}>
                    {HKDollar.format(props.data.price)}
                </Typography>
            </Box>
            <Box width="15%" sx={{
                display: "flex",
                alignItems: "center"
            }}>
                <TextField
                    id="itemQuantity"
                    type="number"
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                    size={"small"}
                    inputProps={{min: 1, max: props.data.stock}}
                    onChange={handleQtyChange}
                    defaultValue={itemQty}
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
                >
                    <DeleteIcon/>
                </IconButton>
            </Box>
        </Box>
    </>
}