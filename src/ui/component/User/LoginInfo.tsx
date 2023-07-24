import Box from "@mui/material/Box";
import {FormLabel, Input} from "@mui/material";
import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import * as FirebaseAuthService from "../../../authService/FirebaseAuthService.ts"
import {useNavigate} from "react-router-dom";
import {handleSignInWithGoogle} from "../../../authService/FirebaseAuthService.ts";
import {GoogleLoginButton} from "react-social-login-buttons";

export default function LoginInfo() {
    const [email, setEmail] = React.useState<string | undefined>(undefined);
    const [password, setPassword] = React.useState<string | undefined>(undefined);
    const [loginError, setLoginError] = React.useState<string>('');
    const navigate = useNavigate();
    const handleEmailInput = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const handlePasswordInput = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const handleSubmitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (email && password) {
            if (await FirebaseAuthService.handleSignInWithEmailAndPassword(email, password)) {
                navigate('/');
            } else {
                setLoginError('Login info incorrect')
            }
        }
    }

    const handleGoogleLogin = async () => {
        if (await handleSignInWithGoogle()) {
            navigate('/');
        } else {
            setLoginError('Login info incorrect')
        }
    }

    return <>
        <Box height="200px"></Box>
        <Box sx={{
            margin: 'auto',
            width: 800,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <form id="login" onSubmit={handleSubmitLogin}>
                <FormLabel>
                    <Typography>
                        Email
                    </Typography>
                </FormLabel>
                <Input
                    sx={{'--Input-decoratorChildHeight': '45px'}}
                    placeholder="email"
                    type="email"
                    required
                    value={email || ''}
                    onChange={handleEmailInput}
                />
                <FormLabel>
                    <Typography>
                        Password
                    </Typography>
                </FormLabel>
                <Input
                    sx={{'--Input-decoratorChildHeight': '45px'}}
                    placeholder="password"
                    type="password"
                    required
                    value={password || ''}
                    onChange={handlePasswordInput}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Box>
        <Box sx={{
            margin: 'auto',
            width: 250,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <GoogleLoginButton onClick={handleGoogleLogin}></GoogleLoginButton>
        </Box>
        <Box sx={{
            margin: 'auto',
            width: 800,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <p>{loginError}</p>
        </Box>
    </>
}