import axios from "axios";
import {PayTransDto} from "../../data/Trans/PayTransDto.ts";
export const payTransApi = async (token:string, tid:string) =>   {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const apiUrl = `http://localhost:8080/transaction/`+ tid + `/pay`
        const response = await axios.patch<PayTransDto>(apiUrl,'',config)
        return response.data;
    }
    catch(e)    {
        console.error(e);
        throw e;
    }
}