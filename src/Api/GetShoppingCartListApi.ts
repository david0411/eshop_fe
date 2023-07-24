import axios from "axios";
import {ShoppingCartListDto} from "../data/ShoppingCartListDto.ts";

export const getShoppingCartListApi = async (token:string) =>   {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const apiUrl = `http://localhost:8080/cart`
        const response = await axios.get<ShoppingCartListDto[]>(apiUrl,config)
        return response.data;
    }
    catch(e)    {
        console.error(e);
        throw e;
    }
}