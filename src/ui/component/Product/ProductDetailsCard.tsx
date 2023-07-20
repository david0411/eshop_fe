import {ProductDetailsDto} from "../../../data/ProductDetailsDto.ts";
import {Alert, Collapse, Grid, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Box from "@mui/material/Box";
import Button, {ButtonProps} from "@mui/material/Button";
import {styled} from "@mui/material/styles";
import {yellow} from "@mui/material/colors";
import * as AddCartItemApi from "../../../Api/AddCartItemApi.tsx"
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';

type Props = {
    data: ProductDetailsDto
}

const ColorButton = styled(Button)<ButtonProps>(({theme}) => ({
    color: theme.palette.getContrastText(yellow[500]),
    backgroundColor: yellow[500],
    '&:hover': {
        backgroundColor: yellow[700],
    },
}));

export default function ProductDetailsCard(props: Props) {
    const [itemQty, setItemQty] = React.useState<number>(1);
    const [addCartItemStatus, setAddCartItemStatus] = React.useState<string | undefined>(undefined);
    const [messageBoxOpen, setMessageBoxOpen] = React.useState<boolean>(true);
    const handleAddCartItem = async () => {
        setAddCartItemStatus(await AddCartItemApi.addCartItemApi(props.data.pid.toString(), itemQty.toString()))
    }
    const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setItemQty(Number(event.target.value));
    }

    function add2CartButton(stock: number) {
        if (stock > 0) {
            return <ColorButton variant="contained" onClick={handleAddCartItem}>Add to Cart</ColorButton>
        } else {
            return <ColorButton variant="contained" disabled>Not Available</ColorButton>
        }
    }

    const addCartMessage = () => {
        if (addCartItemStatus === "SUCCESS") {
            return (
                <Collapse in={messageBoxOpen}>
                    <Alert action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setMessageBoxOpen(false);
                            }}>
                            <CloseIcon fontSize="inherit"/>
                        </IconButton>}
                    >Item added to cart successfully</Alert>
                </Collapse>

            )
        } else if (addCartItemStatus === "FAIL") {
            return (
                <Collapse in={messageBoxOpen}>
                    <Alert severity="error"
                           action={
                               <IconButton
                                   aria-label="close"
                                   color="inherit"
                                   size="small"
                                   onClick={() => {
                                       setMessageBoxOpen(false);
                                   }}>
                                   <CloseIcon fontSize="inherit"/>
                               </IconButton>}
                    >Item failed to add</Alert>
                </Collapse>
            )
        } else {
            return <></>
        }
    }

    return <>
        <Grid item xs={12} sm={6}>
            <Typography component="div">
                <img src={props.data.image_url}
                     alt={props.data.name}
                     loading="lazy"
                     height='320px'/>
            </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
            <Box>
                <Typography sx={{fontSize: 18}} color="black" gutterBottom>
                    {props.data.name}
                </Typography>
            </Box>
            <Box>
                <Typography sx={{fontSize: 14}} color="black" gutterBottom>
                    {props.data.description}
                </Typography>
            </Box>
            <Box>
                <Typography variant="body2">
                    ${props.data.price}
                </Typography>
            </Box>
            <Box>
                <TextField
                    id="itemQuantity"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    size={"small"}
                    inputProps={{min: 0, max: props.data.stock}}
                    onChange={handleTextFieldChange}
                    defaultValue={itemQty}
                />
                <Box height="30px"/>
            </Box>
            <Box>
                {add2CartButton(props.data.stock)}
            </Box>
        </Grid>
        <Grid item xs={12}>
            {addCartMessage()}
        </Grid>
    </>
}