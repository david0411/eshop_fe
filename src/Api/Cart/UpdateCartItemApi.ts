import axios from "axios";
import {CartItemListDto} from "../../data/CartItem/CartItemListDto.ts";
export const updateCartItemApi = async (token:string,productId: string, productQty: string) =>   {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        if(productId)   {
            const apiUrl = `http://localhost:8080/cart/`+ productId + `/` + productQty
            const response = await axios.patch<CartItemListDto>(apiUrl,'',config)
            return response.data;
        }
    }
    catch(e)    {
        console.error(e);
        throw e;
    }
}