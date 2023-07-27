import axios from "axios";
import {PrepTransDto} from "../../data/Trans/PrepTransDto.ts";
import getEnvConfig from "../../Config/EnvConfig.ts"
import {PayTransDto} from "../../data/Trans/PayTransDto.ts";
import {GetTransDto} from "../../data/Trans/GetTransDto.ts";
import {FinishTransDto} from "../../data/Trans/FinishTransDto.ts";

const baseUrl = getEnvConfig().baseUrl;
export const prepTransApi = async (token:string) =>   {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const apiUrl = baseUrl + `transaction/prepare`
        const response = await axios.post<PrepTransDto>(apiUrl,'',config)
        return response.data;
    }
    catch(e)    {
        console.error(e);
        throw e;
    }
}

export const payTransApi = async (token:string, tid:string) =>   {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const apiUrl = baseUrl + `transaction/`+ tid + `/pay`
        const response = await axios.patch<PayTransDto>(apiUrl,'',config)
        return response.data;
    }
    catch(e)    {
        console.error(e);
        throw e;
    }
}

export const getTransApi = async (token:string, tid:string) =>   {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const apiUrl = baseUrl + `transaction/` + tid
        const response = await axios.get<GetTransDto>(apiUrl,config)
        return response.data;
    }
    catch(e)    {
        console.error(e);
        throw e;
    }
}

export const finishTransApi = async (token:string, tid:string) =>   {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const apiUrl = baseUrl + `transaction/`+ tid + `/finish`
        const response = await axios.patch<FinishTransDto>(apiUrl,'',config)
        return response.data;
    }
    catch(e)    {
        console.error(e);
        throw e;
    }
}