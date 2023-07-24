import * as React from 'react';
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Grid} from "@mui/material";
import Box from '@mui/material/Box';
import {ProductListDto} from "../../../data/ProductListDto.ts";
import * as ProductListApi from "../../../Api/GetProductListApi.ts";
import ProductListCard from "./ProductListCard.tsx";
import Loading from "../Utility/Loading.tsx";


export default function ProductList() {
    const [productList, setProductList] = React.useState<ProductListDto[]|undefined>(undefined);
    const navigate = useNavigate()

    const fetchProductData = async () => {
        try {
            setProductList(await ProductListApi.getProductListApi())
        } catch (e) {
            navigate("/error")
        }
    }

    const renderProductList = () => {
        if (productList)    {
            return productList.map((value) => (
                <ProductListCard key={value.pid} data={value}/>
            ))
        } else  {
            return <Loading/>
        }
    }

    useEffect( () => {
        void fetchProductData()
    },[]);

    return <>
        <Box height="70px"></Box>
        <Grid container maxWidth={900} margin="auto" key="itemGrid">
            {renderProductList()}
        </Grid>
    </>
}