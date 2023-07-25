import * as React from "react";
import {useNavigate} from "react-router-dom";
import {Alert, Collapse, Grid} from "@mui/material";
import {styled} from "@mui/material/styles";
import {yellow} from "@mui/material/colors";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button, {ButtonProps} from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {ProductListDto} from "../../../data/Product/ProductListDto.ts";
import * as AddCartItemApi from "../../../Api/Cart/AddCartItemApi.ts";
import {getAccessToken} from "../../../authService/FirebaseAuthService.ts";

type Props = {
    data: ProductListDto
}

const ColorButton = styled(Button)<ButtonProps>(({theme}) => ({
    color: theme.palette.getContrastText(yellow[500]),
    backgroundColor: yellow[500],
    '&:hover': {
        backgroundColor: yellow[700],
    },
}));

export default function ProductListCard(props: Props) {
    const [addCartItemStatus, setAddCartItemStatus] = React.useState<string | undefined>(undefined);
    const [messageBoxOpen, setMessageBoxOpen] = React.useState<boolean>(true);
    const navigate = useNavigate()
    const handleAddCartItem = async () => {
        const token = await getAccessToken()
        setAddCartItemStatus(undefined)
        if (token) {
            const result = await AddCartItemApi.addCartItemApi(token, props.data.pid.toString(), "1")
            if (result) {
                setAddCartItemStatus(result.result)
                setMessageBoxOpen(true)
            }
        }
    }

    const handleItemDetail = () => {
        navigate(`/product/` + props.data.pid.toString())
    }

    const addCartMessage = () => {
        if (addCartItemStatus === "SUCCESS") {
            return (
                <Box sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    zIndex: 'drawer'
                }}
                >
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
                </Box>
            )
        } else if (addCartItemStatus === "FAIL") {
            return (
                <Box sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    zIndex: 'drawer'
                }}
                >
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
                </Box>
            )
        } else {
            return <></>
        }
    }

    function add2CartButton(has_stock: boolean) {
        if (has_stock) {
            return <ColorButton variant="contained" onClick={handleAddCartItem}>Add to Cart</ColorButton>
        } else {
            return <ColorButton variant="contained" disabled>Not Available</ColorButton>
        }
    }

    return <>
        <Grid item xs={12}
              sm={6}
              md={4}
              display="flex"
              justifyContent="center"
              key={props.data.pid}
        >
            <Box sx={{position: 'relative', minWidth: 280, maxWidth: 300, margin: 0}}>
                {addCartMessage()}
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
                                        onClick={handleItemDetail}
                                >
                                    Details</Button>
                            </Box>
                            <Box sx={{minWidth: 160, maxWidth: 200}}>
                                {add2CartButton(props.data.has_stock)}
                            </Box>
                        </CardActions>
                    </React.Fragment>
                </Card>
            </Box>
        </Grid>
    </>
}