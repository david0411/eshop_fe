import axios from "axios";
import {ProductListDto} from "../../data/Product/ProductListDto.ts";
export const getProductListApi = async () =>   {
    try {
        const apiUrl = `http://localhost:8080/public/product`
        const response = await axios.get<ProductListDto[]>(apiUrl)
        return response.data;
    }
    catch(e)    {
        console.error(e);
        throw e;
    }
}