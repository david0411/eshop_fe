import {ProductDetailsDto} from "../../data/ProductDetailsDto.ts";
import {Grid, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Box from "@mui/material/Box";
import Button, {ButtonProps} from "@mui/material/Button";
import {styled} from "@mui/material/styles";
import {yellow} from "@mui/material/colors";

type Props = {
    data: ProductDetailsDto
}

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(yellow[500]),
    backgroundColor: yellow[500],
    '&:hover': {
        backgroundColor: yellow[700],
    },
}));

export default function ProductDetailsCard(props: Props)    {
    const handleAddCartItem = ()=> {
        //Add cart api
    }
    function add2CartButton(stock:number)   {
        if (stock>0)  {
            return <ColorButton variant="contained" onClick={handleAddCartItem()}>Add to Cart</ColorButton>
        }   else    {
            return <ColorButton variant="contained" disabled>Not Available</ColorButton>
        }
    }

    return  <>
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
                />
                <Box height="30px"/>
            </Box>
            <Box>
                {add2CartButton(props.data.stock)}
            </Box>
        </Grid>
    </>
}