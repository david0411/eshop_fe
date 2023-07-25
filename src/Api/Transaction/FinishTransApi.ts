import axios from "axios";
import {FinishTransDto} from "../../data/Trans/FinishTransDto.ts";
export const finishTransApi = async (token:string, tid:string) =>   {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const apiUrl = `http://localhost:8080/transaction/`+ tid + `/finish`
        const response = await axios.patch<FinishTransDto>(apiUrl,'',config)
        return response.data;
    }
    catch(e)    {
        console.error(e);
        throw e;
    }
}