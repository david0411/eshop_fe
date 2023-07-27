import axios from "axios";
import {AddCartItemDto} from "../../data/CartItem/AddCartItemDto.ts";
import getEnvConfig from "../../Config/EnvConfig.ts"
import {CartItemListDto} from "../../data/CartItem/CartItemListDto.ts";

const baseUrl = getEnvConfig().baseUrl;
export const addCartItemApi = async (token:string,productId: string, productQty: string) =>   {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        if(productId)   {
            const apiUrl = baseUrl + `/cart/` + productId + `/` + productQty
            const response = await axios.put<AddCartItemDto>(apiUrl,'',config)
            return response.data;
        }
    }
    catch(e)    {
        console.error(e);
        throw e;
    }
}

export const deleteCartItemApi = async (token:string,productId: string) =>   {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        if(productId)   {
            const apiUrl = baseUrl + `/cart/`+ productId
            const response = await axios.delete<CartItemListDto>(apiUrl,config)
            return response.data;
        }
    }
    catch(e)    {
        console.error(e);
        throw e;
    }
}

export const getCartItemListApi = async (token:string) =>   {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const apiUrl = baseUrl + `/cart`
        const response = await axios.get<CartItemListDto[]>(apiUrl,config)
        return response.data;
    }
    catch(e)    {
        console.error(e);
        throw e;
    }
}

export const updateCartItemApi = async (token:string,productId: string, productQty: string) =>   {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        if(productId)   {
            const apiUrl = baseUrl + `/cart/`+ productId + `/` + productQty
            const response = await axios.patch<CartItemListDto>(apiUrl,'',config)
            return response.data;
        }
    }
    catch(e)    {
        console.error(e);
        throw e;
    }
}