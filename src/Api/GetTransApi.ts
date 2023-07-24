import axios from "axios";
import {GetTransDto} from "../data/GetTransDto.ts";
export const getTransApi = async (token:string, tid:string) =>   {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const apiUrl = `http://localhost:8080/transaction/` + tid
        const response = await axios.get<GetTransDto>(apiUrl,config)
        return response.data;
    }
    catch(e)    {
        console.error(e);
        throw e;
    }
}