import IconButton from "@mui/material/IconButton";
import HomeIcon from '@mui/icons-material/Home';
import {useNavigate} from "react-router-dom";

export default function SearchBarHomeButton()   {
    const navigate = useNavigate()
    const handleToHome = ()=> {
        navigate('/');
    }
    function homeButton() {
            return <IconButton
                size="large"
                aria-label="home"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                onClick={handleToHome}
                color="inherit"
            >
                <HomeIcon/>
            </IconButton>
    }
    return <>
        {homeButton()}
    </>
}