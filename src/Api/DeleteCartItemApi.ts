import axios from "axios";
import {ShoppingCartListDto} from "../data/ShoppingCartListDto.ts";
export const deleteCartItemApi = async (token:string,productId: string) =>   {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        if(productId)   {
            const apiUrl = `http://localhost:8080/cart/`+ productId
            const response = await axios.delete<ShoppingCartListDto>(apiUrl,config)
            return response.data;
        }
    }
    catch(e)    {
        console.error(e);
        throw e;
    }
}