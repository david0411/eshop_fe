import axios from "axios";
import {PrepareTransDto} from "../data/PrepareTransDto.ts";
export const prepTransApi = async (token:string) =>   {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
            const apiUrl = `http://localhost:8080/transaction/prepare`
            const response = await axios.post<PrepareTransDto>(apiUrl,'',config)
            return response.data;
    }
    catch(e)    {
        console.error(e);
        throw e;
    }
}