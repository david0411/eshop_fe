import * as React from "react";
import {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Grid} from "@mui/material";
import Box from "@mui/material/Box";
import {ProductDetailsDto} from "../../../data/Product/ProductDetailsDto.ts";
import * as ProductDetailsApi from "../../../Api/Product/GetProductDetailsApi.ts";
import ProductDetailsCard from "./ProductDetailsCard.tsx"
import Loading from "../Utility/Loading.tsx";

type Params = {
    productId: string
}

export default function ProductDetails() {
    const [productDetails, setProductDetails] = React.useState<ProductDetailsDto | undefined>(undefined);
    const navigate = useNavigate()
    const {productId} = useParams<Params>()
    const fetchProductData = async () => {
        try {
            setProductDetails(await ProductDetailsApi.getProductDetailsApi(productId))
        } catch (e) {
            navigate("/error")
        }
    }

    const renderProductDetail = () => {
        if (productDetails) {
            return <ProductDetailsCard key={productId} data={productDetails}/>
        } else {
            return <Loading/>
        }
    }

    useEffect(() => {
        void fetchProductData()
    }, []);

    return <>
        <Box height="70px"></Box>
        <Grid container maxWidth={900} margin="auto" key="itemDetailGrid">
            {renderProductDetail()}
        </Grid>
    </>
}