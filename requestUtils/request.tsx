import axios from "axios";
import { getCookie } from "../store/saveStore";

const RequestInstance = axios.create({
    baseURL: "https://empresas.ioasys.com.br/api/v1/",
});

type CompanyParams = {
    cookie: {
        client: string,
        uid: string,
        accessToken: string,
        name?:string
    },
    id?:string
   
}

/**
 * run on client side mode
 * @param id 
 */
export const getCompanies = async(id?: number) => {
    const userInformations = getCookie(); 
    if(!userInformations) return;
    let url = !id ? "/enterprises" : `/enterprises/${id}`;
    return await RequestInstance.get(url, {
        headers: {
            "Content-Type": 'application/json',
            "access-token": userInformations.accessToken,
            "client": userInformations.client,
            "uid": userInformations.uid
        }
    });
}

/**
 * run on ssr mode
 * @param cookie 
 * @param id 
 */
export const getCompaniesServer = async({cookie, id}:CompanyParams) => {
    const headers = {
        "Content-Type": 'application/json',
        "access-token": cookie.accessToken,
        "client": cookie.client,
        "uid": cookie.uid
    }
    let url = !id ? "/enterprises" : `/enterprises/${id}`;
    return await RequestInstance.get(url, {
        headers
    });
}

