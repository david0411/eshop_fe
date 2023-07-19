import Box from "@mui/material/Box";
import {FormControl, FormLabel, Input} from "@mui/material";
import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function LoginInfo() {
    const [email, setEmail] = React.useState<string|undefined>(undefined);
    const [password, setPassword] = React.useState<string|undefined>(undefined)

    const handleEmailInput = (event) => {
        setEmail(event.target.value)
    }

    const handlePasswordInput = (event) => {
        setPassword(event.target.value)
    }

    return <>
        <Box height="200px"></Box>
        <Box sx={{margin: 'auto',
            width: 800,
            height: 1000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <form id="login">
                <FormControl>
                    <FormLabel>
                        <Typography>
                            Login
                        </Typography>
                    </FormLabel>
                    <Input
                        sx={{ '--Input-decoratorChildHeight': '45px' }}
                        placeholder="email"
                        type="email"
                        required
                        value={email}
                        onChange={handleEmailInput}
                    />
                    <Input
                        sx={{ '--Input-decoratorChildHeight': '45px' }}
                        placeholder="password"
                        type="password"
                        required
                        value={password}
                        onChange={handlePasswordInput}
                    />
                    <Button type="submit">Submit</Button>
                </FormControl>
            </form>
        </Box>
    </>
}