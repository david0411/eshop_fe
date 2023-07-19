import axios from "axios";
export const addCartItemApi = async (productId: string, productQty: string) =>   {
    try {
        if(productId)   {
            const apiUrl = `http://localhost:8080/cart/`+ productId + `/` + productQty
            const response = await axios.get<string>(apiUrl)
            return response.data;
        }
    }
    catch(e)    {
        console.error(e);
        throw e;
    }
}