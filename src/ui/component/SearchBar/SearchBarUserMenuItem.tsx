import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import {useContext} from "react";
import {userContext} from "../../../App.tsx";
import {useNavigate} from "react-router-dom";
import {handleSignOut} from "../../../authService/FirebaseAuthService.ts";
import LogoutIcon from "@mui/icons-material/Logout";

type Props = {
    handleMobileMenuClose: () => void
}

export default function SearchBarUserMenuItem(props: Props) {
    const loginUser = useContext(userContext);
    const navigate = useNavigate();
    const handleUserLogout = async () => {
        await handleSignOut();
        navigate('/');
    }
    function userMenuItem() {
        if (loginUser) {
            return <MenuItem onClick={() => {
                props.handleMobileMenuClose();
                void handleUserLogout()
            }}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <LogoutIcon/>
                </IconButton>
                <p>Logout</p>
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