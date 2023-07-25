import axios from "axios";
import {CartItemListDto} from "../../data/CartItem/CartItemListDto.ts";

export const getCartItemListApi = async (token:string) =>   {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const apiUrl = `http://localhost:8080/cart`
        const response = await axios.get<CartItemListDto[]>(apiUrl,config)
        return response.data;
    }
    catch(e)    {
        console.error(e);
        throw e;
    }
}