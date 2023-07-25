import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import {useNavigate} from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

type Props = {
    handleMobileMenuClose: () => void
}

export default function SearchBarHomeMenuItem(props: Props) {
    const navigate = useNavigate();

    function homeMenuItem() {
            return <MenuItem onClick={() => {
                props.handleMobileMenuClose()
                navigate('/')
            }}>
                <IconButton
                    size="large"
                    aria-label="cart"
                    color="inherit">
                    <Badge badgeContent={0} color="error">
                        <HomeIcon/>
                    </Badge>
                </IconButton>
                <p>Home</p>
            </MenuItem>

    }

    return <>
        {homeMenuItem()}
    </>
}