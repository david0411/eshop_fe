import axios from "axios";
import {ProductDetailsDto} from "../../data/Product/ProductDetailsDto.ts";
export const getProductDetailsApi = async (productId: string | undefined) =>   {
    try {
        if(productId)   {
            const apiUrl = `http://localhost:8080/public/product/`+ productId
            const response = await axios.get<ProductDetailsDto>(apiUrl)
            return response.data;
        }
    }
    catch(e)    {
        console.error(e);
        throw e;
    }
}