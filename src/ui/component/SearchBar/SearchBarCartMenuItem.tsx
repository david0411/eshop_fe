import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {userContext} from "../../../App.tsx";

type Props = {
    handleMobileMenuClose: () => void
}

export default function SearchBarCartMenuItem(props: Props) {
    const loginUser = useContext(userContext);
    const navigate = useNavigate();

    function cartMenuItem() {
        if (loginUser) {
            return <MenuItem onClick={() => {
                props.handleMobileMenuClose()
                navigate('/shoppingcart')
            }}>
                <IconButton
                    size="large"
                    aria-label="show 4 new mails"
                    color="inherit">
                    <Badge badgeContent={0} color="error">
                        <ShoppingCartIcon/>
                    </Badge>
                </IconButton>
                <p>Shopping Cart</p>
            </MenuItem>
        } else {
            return <MenuItem onClick={() => {
                props.handleMobileMenuClose()
                navigate('/shoppingcart')
            }}>
                <IconButton
                    size="large"
                    aria-label="show 4 new mails"
                    color="inherit">
                    <Badge badgeContent={0} color="error">
                        <ShoppingCartIcon/>
                    </Badge>
                </IconButton>
                <p>Shopping Cart</p>
            </MenuItem>
        }
    }

    return <>
        {cartMenuItem()}
    </>
}