import IconButton from "@mui/material/IconButton";
import {Link} from "react-router-dom";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {useContext} from "react";
import {userContext} from "../../../App.tsx";

export default function SearchBarCartButton()   {
    const loginUser = useContext(userContext)

    function cartButton() {
        if (loginUser) {
            return <IconButton
                size="large"
                aria-label="show 4 new mails"
                component={Link}
                to={`/shoppingcart`}
                color="inherit">
                <Badge badgeContent={0} color="error">
                    <ShoppingCartIcon/>
                </Badge>
            </IconButton>
        } else {
            return <IconButton
                size="large"
                aria-label="show 4 new mails"
                component={Link}
                to={`/login`}
                color="inherit">
                <Badge badgeContent={0} color="error">
                    <ShoppingCartIcon/>
                </Badge>
            </IconButton>
        }
    }

    return  <>
        {cartButton()}
    </>
}