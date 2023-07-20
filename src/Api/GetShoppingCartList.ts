import axios from "axios";
import {ShoppingCartListDto} from "../data/ShoppingCartListDto.ts";
export const getShoppingCartList = async () =>   {
    try {
        const apiUrl = `http://localhost:8080/cart`
        const response = await axios.get<ShoppingCartListDto[]>(apiUrl)
        return response.data;
    }
    catch(e)    {
        console.error(e);
        throw e;
    }
}