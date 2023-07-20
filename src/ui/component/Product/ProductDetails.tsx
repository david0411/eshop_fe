import {Grid} from "@mui/material";
import Box from "@mui/material/Box";
import * as React from "react";
import Loading from "../Utility/Loading.tsx";
import {useEffect} from "react";
import {ProductDetailsDto} from "../../../data/ProductDetailsDto.ts";
import * as ProductDetailsApi from "../../../Api/GetProductDetailsApi.tsx";
import {useNavigate, useParams} from "react-router-dom";
import ProductDetailsCard from "./ProductDetailsCard.tsx"

type Params = {
    productId:string
}

export default function ProductDetails()   {
    const [productDetails, setProductDetails] = React.useState<ProductDetailsDto|undefined>(undefined);
    const navigate = useNavigate()
    const {productId } = useParams<Params>()
    const fetchProductData = async () => {
        try {
            setProductDetails(await ProductDetailsApi.getProductDetailsApi(productId))
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