import {Grid} from "@mui/material";
import Box from "@mui/material/Box";
import * as React from "react";
import Loading from "./Loading.tsx";
import {useEffect, useState} from "react";
import {ProductDetailsDto} from "../../data/ProductDetailsDto.ts";
import * as ProductDetailsApi from "../../Api/GetProductDetailsApi.tsx";
import {useNavigate, useParams} from "react-router-dom";
import ProductDetailsCard from "../../ui/component/ProductDetailsCard.tsx"
import * as mockData from "../../data/mockData.json"

export default function ItemDetails()   {
    const [productDetails, setProductDetails] = React.useState<ProductDetailsDto|undefined>(undefined);
    const navigate = useNavigate()
    const { productId } = useParams()
    const fetchProductData = async () => {
        try {
            setProductDetails(mockData)
        } catch (e) {
            navigate("/error")
        }
    }

    useEffect( () => {
        void fetchProductData()
    },[]);

    const renderProductDetail = () => {
        if (productDetails)    {
            return <ProductDetailsCard key={productId} data={productDetails}/>
        } else  {
            return <Loading/>
        }
    }

    return  <>
        <Box height="70px"></Box>
        <Grid container maxWidth={900} margin="auto" key="itemDetailGrid">
            {renderProductDetail()}
        </Grid>
    </>
}