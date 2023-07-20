import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import {useContext} from "react";
import {userContext} from "../../../App.tsx";
import {useNavigate} from "react-router-dom";

type Props = {
    handleMobileMenuClose: () => void
}

export default function SearchBarUserMenuItem(props: Props) {
    const loginUser = useContext(userContext);
    const navigate = useNavigate();

    function userMenuItem() {
        if (loginUser) {
            return <MenuItem onClick={() => {
                props.handleMobileMenuClose()
                navigate('/profile')
            }}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle/>
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        } else {
            return <MenuItem onClick={() => {
                props.handleMobileMenuClose()
                navigate('/login')
            }}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle/>
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        }
    }

    return <>
        {userMenuItem()}
    </>
}