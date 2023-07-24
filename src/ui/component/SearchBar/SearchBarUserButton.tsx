import IconButton from "@mui/material/IconButton";
import {useNavigate} from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";
import {useContext} from "react";
import {userContext} from "../../../App.tsx";
import {handleSignOut} from "../../../authService/FirebaseAuthService.ts";
import LogoutIcon from '@mui/icons-material/Logout';

export default function SearchBarUserButton() {
    const loginUser = useContext(userContext)
    const navigate = useNavigate();

    const handleUserLogout = async () => {
        await handleSignOut();
        navigate('/');
    }

    const handleUserLogin = () => {
        navigate('/login');
    }


    function userButton() {
        if (loginUser) {
            return <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                onClick={handleUserLogout}
                color="inherit"
            >
                <LogoutIcon/>
            </IconButton>
        } else {
            return <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                onClick={handleUserLogin}
                color="inherit"
            >
                <AccountCircle/>
            </IconButton>
        }
    }

    return <>
        {userButton()}
    </>
}