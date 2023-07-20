import IconButton from "@mui/material/IconButton";
import {Link} from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";
import {useContext} from "react";
import {userContext} from "../../../App.tsx";

export default function SearchBarUserButton()   {
    const loginUser = useContext(userContext)

    function userButton() {
        if (loginUser) {
            return <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                component={Link}
                to={`/profile`}
                color="inherit"
            >
                <AccountCircle/>
            </IconButton>
        } else {
            return <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                component={Link}
                to={`/login`}
                color="inherit"
            >
                <AccountCircle/>
            </IconButton>
        }
    }

    return  <>
        {userButton()}
        </>
}