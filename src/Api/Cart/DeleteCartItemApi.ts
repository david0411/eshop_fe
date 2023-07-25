import axios from "axios";
import {CartItemListDto} from "../../data/CartItem/CartItemListDto.ts";
export const deleteCartItemApi = async (token:string,productId: string) =>   {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        if(productId)   {
            const apiUrl = `http://localhost:8080/cart/`+ productId
            const response = await axios.delete<CartItemListDto>(apiUrl,config)
            return response.data;
        }
    }
    catch(e)    {
        console.error(e);
        throw e;
    }
}