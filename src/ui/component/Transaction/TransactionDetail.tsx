import React, {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {FormLabel, Input, Stack} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {getAccessToken} from "../../../authService/FirebaseAuthService.ts";
import {GetTransDto} from "../../../data/GetTransDto.ts"
import * as GetTransApi from "../../../Api/GetTransApi.ts"
import TransItemCard from "./TransItemCard.tsx";
import Loading from "../Utility/Loading.tsx";
import Button from "@mui/material/Button";

type Params = {
    transactionId:string
}

export default function TransactionDetail() {
    const [transData, setTransData] = React.useState<GetTransDto|undefined>(undefined);
    const [cardNo, setCardNo] = React.useState<number|undefined>(undefined)
    const [expDate, setExpDate] = React.useState<Date|undefined>(undefined)
    const [cvv, setCvv] = React.useState<number|undefined>(undefined)
    const navigate = useNavigate();
    const {transactionId} = useParams<Params>();

    const fetchTransData = async () => {
        try {
            const token = await getAccessToken()
            console.log(transactionId)
            if(token && transactionId)  {
                setTransData(await GetTransApi.getTransApi(token, transactionId))
            }
        } catch (e) {
            navigate("/error")
        }
    }

    const transItemListHeader = () => {
        return <>
            <Box display="flex" flexDirection="row">
                <Box width="20%" sx={{
                    textAlign: "center"
                }}>
                    <Typography
                        variant="subtitle2"
                        noWrap
                        component="div"
                        sx={{display: {xs: 'none', sm: 'block'}}}
                    >Item Image
                    </Typography>
                </Box>
                <Box width="20%" sx={{
                    textAlign: "center"
                }}>
                    <Typography
                        variant="subtitle2"
                        noWrap
                        component="div"
                        sx={{display: {xs: 'none', sm: 'block'}}}
                    >Item Name</Typography>
                </Box>
                <Box width="15%" sx={{
                    textAlign: "center"
                }}>
                    <Typography
                        variant="subtitle2"
                        noWrap
                        component="div"
                        sx={{display: {xs: 'none', sm: 'block'}}}
                    >Unit Price
                    </Typography>
                </Box>
                <Box width="15%" sx={{
                    textAlign: "center"
                }}>
                    <Typography
                        variant="subtitle2"
                        noWrap
                        component="div"
                        sx={{display: {xs: 'none', sm: 'block'}}}
                    >Item Qty
                    </Typography>
                </Box>
                <Box width="25%" sx={{
                    textAlign: "center"
                }}>
                    <Typography
                        variant="subtitle2"
                        noWrap
                        component="div"
                        sx={{display: {xs: 'none', sm: 'block'}}}
                    >Item Subtotal
                    </Typography>
                </Box>
            </Box>
        </>
    }

    const renderTransItemList = () => {
        if(transData && transData.items.length>0)  {
            return transData.items.map((value) => {
                return <TransItemCard key={value.tpid} data={value}/>
            })
        } else  {
            return <Loading/>
        }
    }
    const handleCardNoInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCardNo(Number(event.target.value))
    }

    const handleExpDateInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setExpDate(event.target.value)
    }

    const handleCVVInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCvv(Number(event.target.value))
    }
    const handleSubmitPayment = () => {
        navigate('/thankyou')
    }

    const transFooter = () => {
        return <>
            <Box height="200px"></Box>
            <Box sx={{
                margin: 'auto',
                width: 800,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <form id="login" onSubmit={handleSubmitPayment}>
                    <FormLabel>
                        <Typography>
                            Credit Card Number
                        </Typography>
                    </FormLabel>
                    <Input
                        sx={{'--Input-decoratorChildHeight': '45px'}}
                        type="tel"
                        required
                        value={cardNo || ''}
                        onChange={handleCardNoInput}
                    />
                    <FormLabel>
                        <Typography>
                            Expiry Date
                        </Typography>
                    </FormLabel>
                    <Input
                        sx={{'--Input-decoratorChildHeight': '45px'}}
                        type="month"
                        required
                        value={expDate || ''}
                        onChange={handleExpDateInput}
                    />
                    <FormLabel>
                        <Typography>
                            CVV
                        </Typography>
                    </FormLabel>
                    <Input
                        sx={{'--Input-decoratorChildHeight': '45px'}}
                        inputProps={{min: 0, max: 999}}
                        type="tel"
                        required
                        value={cvv || ''}
                        onChange={handleCVVInput}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Box>
        </>
    }

    useEffect(()=> {
        setTransData(undefined)
        void fetchTransData()
    },[])

    return  <>
        <Box height="70px"></Box>

        <Stack maxWidth={900} margin="auto" key="CartItemStack">
            <Box maxWidth={900} margin="auto">
                <h1>Transaction</h1>
            </Box>
            {transItemListHeader()}
            {renderTransItemList()}
            {transFooter()}
        </Stack>
    </>
}