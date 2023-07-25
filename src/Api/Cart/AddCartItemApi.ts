import axios from "axios";
import {AddCartItemDto} from "../../data/CartItem/AddCartItemDto.ts";
export const addCartItemApi = async (token:string,productId: string, productQty: string) =>   {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        if(productId)   {
            const apiUrl = `http://localhost:8080/cart/`+ productId + `/` + productQty
            const response = await axios.put<AddCartItemDto>(apiUrl,'',config)
            return response.data;
        }
    }
    catch(e)    {
        console.error(e);
        throw e;
    }
}