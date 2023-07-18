import * as React from 'react';
import Box from '@mui/material/Box';
import {Grid} from "@mui/material";
import {ProductListDto} from "../../../../data/ProductListDto.ts";
import * as ProductListApi from "../../../../Api/GetProductListApi.ts";
import {useEffect} from "react";
import Loading from "./Loading.tsx";
import ProductCard from "./ProductCard.tsx";
import {useNavigate} from "react-router-dom";


export default function ItemList() {
    const [productList, setProductList] = React.useState<ProductListDto[]|undefined>(undefined);
    const navigate = useNavigate()

    const fetchProductData = async () => {
        try {
            setProductList(await ProductListApi.getProductListApi())
        } catch (e) {
            navigate("/error")
        }
    }

    useEffect( () => {
        void fetchProductData()
    },[]);

    const renderProductList = () => {
        if (productList)    {
            return productList.map((value) => (
                <ProductCard key={value.pid} data={value}/>
            ))
        } else  {
            return <Loading/>
        }
    }

    return <>
        <Box height="70px"></Box>
        <Grid container maxWidth={900} margin="auto" key="itemGrid">
            {renderProductList()}
        </Grid>
    </>
}