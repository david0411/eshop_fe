import {Grid} from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import * as React from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button, {ButtonProps} from "@mui/material/Button";
import {ProductListDto} from "../../data/ProductListDto.ts";
import {styled} from "@mui/material/styles";
import {yellow} from "@mui/material/colors";
import {Link} from "react-router-dom";

type Props = {
    data:ProductListDto
}

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(yellow[500]),
    backgroundColor: yellow[500],
    '&:hover': {
        backgroundColor: yellow[700],
    },
}));

function add2CartButton(has_stock:boolean)   {
    if (has_stock)  {
        return <ColorButton variant="contained">Add to Cart</ColorButton>
    }   else    {
        return <ColorButton variant="contained" disabled>Not Available</ColorButton>
    }
}

export default function ProductCard(props: Props)   {
    return <Grid item xs={12}
          sm={6}
          md={4}
          display="flex"
          justifyContent="center"
          key={props.data.pid}>
        <Box sx={{minWidth: 280, maxWidth: 300, margin: 0}}>
            <Card variant="outlined">
                <React.Fragment>
                    <CardContent>
                        <Typography sx={{fontSize: 14}} color="black" gutterBottom>
                            {props.data.name}
                        </Typography>
                        <Typography component="div">
                            <img src={props.data.image_url}
                                 alt={props.data.name}
                                 loading="lazy"
                                 height='120px'/>
                        </Typography>
                        <Typography variant="body2">
                            ${props.data.price}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Box sx={{minWidth: 80, maxWidth: 100}}>
                            <Button variant="contained"
                            component={Link}
                            to={`/product/${props.data.pid}`}>Details</Button>
                        </Box>
                        <Box sx={{minWidth: 160, maxWidth: 200}}>
                            {add2CartButton(props.data.has_stock)}
                        </Box>
                    </CardActions>
                </React.Fragment>
            </Card>
        </Box>
    </Grid>
}