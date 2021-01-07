import {defaultAccessValue} from './initialInterfaceValues';
import {UserAccess, Access, Login } from './loginInterfaces';
import {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import {useRouter} from 'next/router';
import { setCookie, getCookie, deleteCookie } from './saveStore';


export  function useAccessContext(): UserAccess {
    const router = useRouter();
    const userCookie: Access = getCookie();
    const initialUserValue = userCookie || defaultAccessValue
    const [user, setUser] = useState<Access>(initialUserValue);
    const [isLoading, setIsLoading] = useState(false);
    const [feedback, setfeedback] = useState("");
    
    useEffect(() => {
      console.log('entra aqui');
      if(!user.accessToken) {
        router.push('/login');
      } 
    }, [user]);

    /**
     * create user session
     */
    const doLogin = useCallback(async(email, password) => {
        try {
            setIsLoading(true);
            //     "email" : "testeapple@ioasys.com.br",
            //     "password" : "12341234"
            const options = {
              email,
              password
            }
            const response = await axios.post('https://empresas.ioasys.com.br/api/v1/users/auth/sign_in', options);
            const {headers, data} = response;
            const {uid, client} = headers;
            const accessToken = headers['access-token'];
            const userData = {
              name: data.investor.investor_name,
              email: data.investor.email,
              uid,
              client,
              accessToken,
            };
            setfeedback("logged");
            setUser(userData);
            setCookie(userData);
            router.push('/company');
            
          } catch({response}) {
            if(response.status === 401) {
              return setfeedback("unauthorized")
            }
            return setfeedback("internalError");
          } finally {
            setIsLoading(false);
          }
    }, [setUser]);
    
    /**
     * will remove user access login
     */
    const doLogout = () => {
      deleteCookie();
      setUser(defaultAccessValue);    
    };

    return {
        user,
        doLogin,
        doLogout,
        isLoading,
        feedback
    }
}   