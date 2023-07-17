import axios from "axios";
import {ProductData} from "../data/ProductData.ts";
export const getProductListApi = async () =>   {
    try {
        const apiUrl = `http://54.255.242.1:8080/public/product`
        const response = await axios.get<ProductData>(apiUrl)
        return response.data;
    }
    catch(e)    {
        console.error(e);
    }
}